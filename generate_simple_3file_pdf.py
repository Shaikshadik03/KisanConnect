import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted, HRFlowable
)
from reportlab.pdfgen import canvas

class SimpleCanvas(canvas.Canvas):
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
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, page_count):
        self.saveState()
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8.5)
            self.setFillColor(colors.HexColor("#14532d"))
            self.drawString(36, 756, "🌾 KISANCONNECT — 3-FILE CODEBOOK")
            self.setFont("Helvetica", 8.5)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawString(220, 756, "• index.html + style.css + app.js")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.8)
            self.line(36, 748, 576, 748)
        
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.8)
        self.line(36, 38, 576, 38)
        self.setFont("Helvetica", 8.5)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 26, "KisanConnect • Just 3 Files • Direct Double-Click Ready in Chrome")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 26, page_str)
        self.restoreState()

def generate_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()

    cover_title = ParagraphStyle(
        'CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#14532d"),
        spaceAfter=6
    )
    
    cover_sub = ParagraphStyle(
        'CoverSub',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#475569"),
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'H1',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#14532d"),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=0
    )

    story = []

    # Title & Quick Guide
    story.append(Paragraph("🌾 KisanConnect — 3-File Complete Codebook", cover_title))
    story.append(Paragraph("Only 3 files needed: <b>index.html</b>, <b>style.css</b>, and <b>app.js</b>. No subfolders, no server required!", cover_sub))

    guide_box = [
        [
            Paragraph("<b>⚡ 3 EASY STEPS TO RUN (ANY COMPUTER):</b><br/>"
                      "<b>1. Create a folder</b> anywhere named <code>KisanConnect</code>.<br/>"
                      "<b>2. Create exactly 3 files inside it:</b><br/>"
                      "&nbsp;&nbsp;&nbsp;&nbsp;• <code>index.html</code><br/>"
                      "&nbsp;&nbsp;&nbsp;&nbsp;• <code>style.css</code><br/>"
                      "&nbsp;&nbsp;&nbsp;&nbsp;• <code>app.js</code><br/>"
                      "<b>3. Open in Chrome:</b> Just <b>double-click <code>index.html</code></b>. It opens immediately and works 100% perfectly!", body_style)
        ]
    ]
    t_guide = Table(guide_box, colWidths=[540])
    t_guide.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#22c55e")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_guide)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    base_dir = r"C:\Users\arsha\.gemini\antigravity\scratch\sih-projects\KisanConnect"
    files = [
        ("index.html", "📄 FILE 1 OF 3: index.html (Main Web Page Markup)"),
        ("style.css", "🎨 FILE 2 OF 3: style.css (Nordic-Organic Styling)"),
        ("app.js", "⚡ FILE 3 OF 3: app.js (Price Engine & Logic)")
    ]

    for filename, title in files:
        full_path = os.path.join(base_dir, filename)
        with open(full_path, "r", encoding="utf-8") as f:
            code = f.read()

        story.append(Paragraph(title, h1_style))
        story.append(Paragraph(f"Save as: <b><code>{filename}</code></b> in your folder.", body_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceBefore=2, spaceAfter=6))

        lines = code.splitlines()
        chunk_size = 50
        for i in range(0, len(lines), chunk_size):
            chunk = "\n".join(lines[i:i+chunk_size])
            tbl = Table([[Preformatted(chunk, code_style)]], colWidths=[540])
            tbl.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
                ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor("#e2e8f0")),
                ('PADDING', (0,0), (-1,-1), 4),
            ]))
            story.append(tbl)
            story.append(Spacer(1, 3))

        story.append(Spacer(1, 10))

    doc.build(story, canvasmaker=SimpleCanvas)
    print("3-File Simple PDF created successfully!")

if __name__ == "__main__":
    out_pdf = r"C:\Users\arsha\.gemini\antigravity\scratch\sih-projects\KisanConnect\KisanConnect_3Files_Codebook.pdf"
    generate_pdf(out_pdf)
