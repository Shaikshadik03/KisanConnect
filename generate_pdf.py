import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Preformatted
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#576550"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "🌾 KisanConnect — Complete Source Code & VS Code Guide")
            self.setStrokeColor(colors.HexColor("#e2e8da"))
            self.setLineWidth(0.75)
            self.line(54, 742, 558, 742)
        
        # Footer
        self.setStrokeColor(colors.HexColor("#e2e8da"))
        self.setLineWidth(0.75)
        self.line(54, 45, 558, 45)
        self.drawString(54, 32, "Direct Farm-to-Consumer Organic Marketplace")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_str)
        self.restoreState()

def create_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#14532d"),
        spaceAfter=8
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#576550"),
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#14532d"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#ea580c"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1c2817"),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1c2817"),
        leftIndent=15,
        spaceAfter=3
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        fontName='Courier',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=0
    )

    story = []

    # Title Banner
    story.append(Paragraph("🌾 KisanConnect — Complete Source Code & Execution Guide", title_style))
    story.append(Paragraph("Direct Farm-to-Consumer Organic Marketplace • Full Codebook", subtitle_style))
    
    # Overview Box
    meta_data = [
        [Paragraph("<b>Project:</b> KisanConnect", body_style), Paragraph("<b>Tech:</b> HTML5, CSS3, ES6 JS, Chart.js", body_style)],
        [Paragraph("<b>Design:</b> Nordic-Organic Bento-Grid", body_style), Paragraph("<b>Status:</b> Production-Ready", body_style)]
    ]
    t = Table(meta_data, colWidths=[260, 260])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#86efac")),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(Spacer(1, 14))

    # SECTION 1: HOW TO PASTE & RUN IN VS CODE & CHROME
    story.append(Paragraph("🚀 1. How to Setup in VS Code & Open in Google Chrome", h1_style))
    
    story.append(Paragraph("<b>Step 1: Create the Project Folder</b>", h2_style))
    story.append(Paragraph("• Open File Explorer and create a new folder on your computer named <code>KisanConnect</code>.", bullet_style))
    story.append(Paragraph("• Inside the <code>KisanConnect</code> folder, create a subfolder named <code>data</code>.", bullet_style))
    story.append(Paragraph("• Your folder structure should look like this:", bullet_style))
    
    tree_text = """KisanConnect/
├── index.html
├── style.css
├── app.js
└── data/
    ├── listings.json
    └── market_prices.json"""
    
    tree_table = Table([[Preformatted(tree_text, code_style)]], colWidths=[520])
    tree_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(tree_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Step 2: Open Folder in VS Code & Create Files</b>", h2_style))
    story.append(Paragraph("1. Open <b>Visual Studio Code</b>.", bullet_style))
    story.append(Paragraph("2. Click <b>File ➔ Open Folder...</b> (or press <code>Ctrl + K, Ctrl + O</code>) and select the <code>KisanConnect</code> folder.", bullet_style))
    story.append(Paragraph("3. In VS Code's left Explorer panel, create the following 5 files:", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;• <code>index.html</code> (in the main folder)", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;• <code>style.css</code> (in the main folder)", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;• <code>app.js</code> (in the main folder)", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;• <code>data/listings.json</code> (inside the data folder)", bullet_style))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;• <code>data/market_prices.json</code> (inside the data folder)", bullet_style))
    story.append(Paragraph("4. Copy each code block from this document and paste it into its respective file. Save with <code>Ctrl + S</code>.", bullet_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Step 3: How to Open & Run in Google Chrome</b>", h2_style))
    story.append(Paragraph("Choose either of the two easy methods below:", body_style))
    
    methods_data = [
        [
            Paragraph("<b>Method A: Direct Double-Click (Easiest)</b><br/>1. Open File Explorer and navigate to your <code>KisanConnect</code> folder.<br/>2. Right-click on <code>index.html</code>.<br/>3. Select <b>Open with ➔ Google Chrome</b>.<br/>4. The app will launch immediately in Chrome!", body_style),
            Paragraph("<b>Method B: VS Code Live Server</b><br/>1. In VS Code, click Extensions (<code>Ctrl+Shift+X</code>).<br/>2. Search for <b>Live Server</b> and install it.<br/>3. Right-click on <code>index.html</code> in VS Code.<br/>4. Click <b>Open with Live Server</b>.<br/>5. Chrome opens automatically at <code>http://127.0.0.1:5500</code>.", body_style)
        ]
    ]
    t_methods = Table(methods_data, colWidths=[255, 255])
    t_methods.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fefce8")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#fef08a")),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_methods)
    
    story.append(PageBreak())

    # READ ALL 5 FILES
    base_dir = r"C:\Users\arsha\.gemini\antigravity\scratch\sih-projects\KisanConnect"
    files = [
        ("index.html", "📄 2. index.html (Complete Frontend Markup)"),
        ("style.css", "🎨 3. style.css (Nordic-Organic Bento Stylesheet)"),
        ("app.js", "⚡ 4. app.js (Business Logic & Price Engine)"),
        ("data/listings.json", "📦 5. data/listings.json (Harvest Listings & Photos)"),
        ("data/market_prices.json", "📊 6. data/market_prices.json (Mandi & Retail Benchmarks)")
    ]

    for rel_path, section_title in files:
        full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        story.append(Paragraph(section_title, h1_style))
        story.append(Paragraph(f"<b>File location:</b> <code>KisanConnect/{rel_path}</code>", body_style))
        
        # Split large content into chunks of ~50 lines to avoid ReportLab table overflow
        lines = content.splitlines()
        chunk_size = 55
        for i in range(0, len(lines), chunk_size):
            chunk = "\n".join(lines[i:i+chunk_size])
            code_tbl = Table([[Preformatted(chunk, code_style)]], colWidths=[520])
            code_tbl.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
                ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
                ('PADDING', (0,0), (-1,-1), 5),
            ]))
            story.append(code_tbl)
            story.append(Spacer(1, 4))
        
        story.append(Spacer(1, 10))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully at: {output_path}")

if __name__ == "__main__":
    out = r"C:\Users\arsha\.gemini\antigravity\scratch\sih-projects\KisanConnect\KisanConnect_Complete_Code_Guide.pdf"
    create_pdf(out)
