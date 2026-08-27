import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Preformatted, HRFlowable
)
from reportlab.pdfgen import canvas

class CleanNumberedCanvas(canvas.Canvas):
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
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#14532d"))
            self.drawString(36, 756, "KISANCONNECT")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawString(110, 756, "— Complete Codebook & VS Code Execution Manual")
            
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.75)
            self.line(36, 748, 576, 748)
        
        # Footer (All pages)
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(36, 38, 576, 38)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 26, "🌾 KisanConnect • Direct Farm-to-Consumer Marketplace")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 26, page_str)
        self.restoreState()

def build_pdf(output_pdf_path):
    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()
    
    # Typography Styles
    cover_title = ParagraphStyle(
        'CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#14532d"),
        spaceAfter=6
    )
    
    cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#475569"),
        spaceAfter=14
    )

    section_h1 = ParagraphStyle(
        'SecH1',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#14532d"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    section_h2 = ParagraphStyle(
        'SecH2',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor("#ea580c"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_txt = ParagraphStyle(
        'BodyTxt',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=5
    )

    bullet_txt = ParagraphStyle(
        'BulletTxt',
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor("#1e293b"),
        leftIndent=12,
        spaceAfter=3
    )

    step_title = ParagraphStyle(
        'StepTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=2
    )

    code_font = ParagraphStyle(
        'CodeFont',
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=0
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER & COMPREHENSIVE SETUP GUIDE
    # =========================================================================
    story.append(Paragraph("🌾 KisanConnect — Complete Project Codebook", cover_title))
    story.append(Paragraph("Direct Farm-to-Consumer Organic Marketplace • Complete Source Code & VS Code Execution Manual", cover_subtitle))
    
    # Metadata Overview Table
    meta_info = [
        [Paragraph("<b>Project:</b> KisanConnect", body_txt), Paragraph("<b>Tech Stack:</b> HTML5, CSS3 Grid, JavaScript (ES6+), Chart.js", body_txt)],
        [Paragraph("<b>Design:</b> Nordic-Organic Bento-Grid", body_txt), Paragraph("<b>Target Browser:</b> Google Chrome (Zero Setup Needed)", body_txt)],
        [Paragraph("<b>Files Included:</b> 5 Complete Files", body_txt), Paragraph("<b>License & Status:</b> MIT • 100% Functional Demo", body_txt)]
    ]
    meta_table = Table(meta_info, colWidths=[270, 270])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1.2, colors.HexColor("#86efac")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    # SECTION 1: DETAILED STEP-BY-STEP INSTRUCTIONS
    story.append(Paragraph("📖 1. How to Setup & Paste in Visual Studio Code (Step-by-Step)", section_h1))
    
    step1_box = [
        [
            Paragraph("<b>STEP 1: Create the Exact Project Directory Structure on Your Computer</b>", step_title),
            Paragraph("1. Create a new folder named <b><code>KisanConnect</code></b> on your Desktop or in Documents.<br/>"
                      "2. Inside the <code>KisanConnect</code> folder, create a subfolder named <b><code>data</code></b>.<br/>"
                      "Your directory structure must match this layout exactly:", body_txt),
            Preformatted("""KisanConnect/
├── index.html                  (Main Web Page)
├── style.css                   (Nordic-Organic Styling)
├── app.js                      (Price Engine & Interactivity)
└── data/
    ├── listings.json           (Farm Produce Seed Data)
    └── market_prices.json      (Mandi & Retail Benchmarks)""", code_font)
        ]
    ]
    t_step1 = Table([[step1_box[0][0]], [step1_box[0][1]], [step1_box[0][2]]], colWidths=[540])
    t_step1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_step1)
    story.append(Spacer(1, 8))

    step2_box = [
        Paragraph("<b>STEP 2: Open VS Code and Create the 5 Files</b>", step_title),
        Paragraph("1. Open <b>Visual Studio Code</b> on your laptop.<br/>"
                  "2. Click <b>File ➔ Open Folder...</b> (or press <code>Ctrl + K, Ctrl + O</code>) and select your <code>KisanConnect</code> folder.<br/>"
                  "3. In VS Code's left Explorer panel, create the 5 files:<br/>"
                  "&nbsp;&nbsp;&nbsp;&nbsp;• Click <b>New File</b> ➔ type <code>index.html</code> (save in main folder)<br/>"
                  "&nbsp;&nbsp;&nbsp;&nbsp;• Click <b>New File</b> ➔ type <code>style.css</code> (save in main folder)<br/>"
                  "&nbsp;&nbsp;&nbsp;&nbsp;• Click <b>New File</b> ➔ type <code>app.js</code> (save in main folder)<br/>"
                  "&nbsp;&nbsp;&nbsp;&nbsp;• Right-click <code>data</code> folder ➔ <b>New File</b> ➔ type <code>listings.json</code><br/>"
                  "&nbsp;&nbsp;&nbsp;&nbsp;• Right-click <code>data</code> folder ➔ <b>New File</b> ➔ type <code>market_prices.json</code><br/>"
                  "4. Copy the exact code from each section of this PDF into its respective file and press <b><code>Ctrl + S</code></b> to save.", body_txt)
    ]
    t_step2 = Table([[step2_box[0]], [step2_box[1]]], colWidths=[540])
    t_step2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_step2)
    story.append(Spacer(1, 8))

    # SECTION 2: HOW TO OPEN IN GOOGLE CHROME
    story.append(Paragraph("🌐 2. How to Open and Run in Google Chrome", section_h1))
    
    chrome_methods = [
        [
            Paragraph("<b>METHOD A: Double-Click File (Easiest — 5 Seconds)</b><br/>"
                      "1. Open Windows File Explorer and navigate into your <code>KisanConnect</code> folder.<br/>"
                      "2. <b>Right-click</b> on <code>index.html</code>.<br/>"
                      "3. Select <b>Open with ➔ Google Chrome</b>.<br/>"
                      "4. KisanConnect will immediately run in Chrome with full interactivity!", body_txt),
            Paragraph("<b>METHOD B: VS Code Live Server (Best for Editing)</b><br/>"
                      "1. In VS Code, press <code>Ctrl + Shift + X</code> to open Extensions.<br/>"
                      "2. Search for <b>Live Server</b> and click <b>Install</b>.<br/>"
                      "3. Right-click anywhere inside <code>index.html</code>.<br/>"
                      "4. Click <b>Open with Live Server</b>.<br/>"
                      "5. Chrome opens automatically at <code>http://127.0.0.1:5500</code>.", body_txt)
        ]
    ]
    t_chrome = Table(chrome_methods, colWidths=[265, 265])
    t_chrome.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fefce8")),
        ('BOX', (0,0), (-1,-1), 1.2, colors.HexColor("#fef08a")),
        ('PADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_chrome)

    story.append(PageBreak())

    # =========================================================================
    # CODE SECTIONS (ALL 5 FILES)
    # =========================================================================
    base_dir = r"C:\Users\arsha\.gemini\antigravity\scratch\sih-projects\KisanConnect"
    
    files_to_print = [
        ("index.html", "📄 3. index.html — Complete Frontend Markup", "Place this file directly in the main `KisanConnect` root folder."),
        ("style.css", "🎨 4. style.css — Nordic-Organic Bento Stylesheet", "Place this file directly in the main `KisanConnect` root folder."),
        ("app.js", "⚡ 5. app.js — Business Logic & Price Comparison Engine", "Place this file directly in the main `KisanConnect` root folder."),
        ("data/listings.json", "📦 6. data/listings.json — Farm Produce Dataset with High-Res Photos", "Place this file inside the `data/` subfolder: `KisanConnect/data/listings.json`"),
        ("data/market_prices.json", "📊 7. data/market_prices.json — Mandi vs Retail Benchmarks", "Place this file inside the `data/` subfolder: `KisanConnect/data/market_prices.json`")
    ]

    for rel_path, title, subtitle in files_to_print:
        full_path = os.path.join(base_dir, rel_path.replace("/", os.sep))
        with open(full_path, "r", encoding="utf-8") as f:
            file_code = f.read()

        story.append(Paragraph(title, section_h1))
        story.append(Paragraph(f"<b>File Path:</b> <code>{rel_path}</code> &nbsp;•&nbsp; <i>{subtitle}</i>", body_txt))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#e2e8f0"), spaceBefore=3, spaceAfter=6))
        
        # Split code into bite-sized chunks so ReportLab never overflows pages
        lines = file_code.splitlines()
        chunk_size = 50
        for i in range(0, len(lines), chunk_size):
            chunk = "\n".join(lines[i:i+chunk_size])
            code_tbl = Table([[Preformatted(chunk, code_font)]], colWidths=[540])
            code_tbl.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
                ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor("#e2e8f0")),
                ('PADDING', (0,0), (-1,-1), 4),
            ]))
            story.append(code_tbl)
            story.append(Spacer(1, 3))
        
        story.append(Spacer(1, 10))

    doc.build(story, canvasmaker=CleanNumberedCanvas)
    print(f"Clear PDF successfully built at: {output_pdf_path}")

if __name__ == "__main__":
    out_pdf = r"C:\Users\arsha\.gemini\antigravity\scratch\sih-projects\KisanConnect\KisanConnect_Complete_Code_Guide.pdf"
    build_pdf(out_pdf)
