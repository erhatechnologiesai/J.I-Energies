import io
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

NAVY = colors.HexColor("#0B2D5B")
YELLOW = colors.HexColor("#FFC107")
GREEN = colors.HexColor("#22A559")
LIGHT_BG = colors.HexColor("#F5F7FA")
TEXT_DARK = colors.HexColor("#1A202C")
BORDER_COLOR = colors.HexColor("#D9DEE7")

def generate_solar_proposal_pdf(data: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=NAVY
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=GREEN
    )

    h2_style = ParagraphStyle(
        'H2Style',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=NAVY,
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK
    )

    small_style = ParagraphStyle(
        'SmallMuted',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#718096")
    )

    story = []

    # Header Banner
    header_data = [
        [
            Paragraph("<b>J.I ENERGIES</b><br/><font size=8 color='#0B2D5B'>Solar Energy & Power Solutions • Pakistan</font>", title_style),
            Paragraph(f"<b>SOLAR PROPOSAL</b><br/><font size=8 color='#718096'>Date: {datetime.now().strftime('%d %b %Y')}<br/>Ref: JIE-{int(datetime.now().timestamp())%100000}</font>", subtitle_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[340, 200])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
    ]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=2, color=YELLOW, spaceBefore=6, spaceAfter=12))

    # Customer & Bill Details
    customer_name = data.get("customer_name", "Valued Customer")
    phone = data.get("phone", "N/A")
    city = data.get("city", "Pakistan")
    monthly_bill = float(data.get("monthly_bill", 75000))
    disco = data.get("disco", "MEPCO")
    system_kw = float(data.get("recommended_kw", 10.0))
    panel_count = int(data.get("panel_count", 18))
    panel_wattage = int(data.get("panel_wattage", 585))
    est_monthly_units = float(data.get("estimated_monthly_units", 1250))
    est_monthly_savings = float(data.get("estimated_monthly_savings_pkr", 70000))
    est_annual_savings = float(data.get("estimated_annual_savings_pkr", 840000))
    est_cost = float(data.get("estimated_system_cost_pkr", 1150000))
    payback = float(data.get("payback_years", 2.8))

    story.append(Paragraph("1. Customer Profile & Current Usage", h2_style))
    cust_data = [
        [Paragraph("<b>Customer Name:</b>", body_style), Paragraph(customer_name, body_style), Paragraph("<b>City / Region:</b>", body_style), Paragraph(city, body_style)],
        [Paragraph("<b>Contact Phone:</b>", body_style), Paragraph(phone, body_style), Paragraph("<b>DISCO Provider:</b>", body_style), Paragraph(disco, body_style)],
        [Paragraph("<b>Current Monthly Bill:</b>", body_style), Paragraph(f"PKR {monthly_bill:,.0f}", body_style), Paragraph("<b>Annual Electricity Cost:</b>", body_style), Paragraph(f"PKR {monthly_bill * 12:,.0f}", body_style)],
    ]
    cust_table = Table(cust_data, colWidths=[135, 135, 135, 135])
    cust_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(cust_table)
    story.append(Spacer(1, 10))

    # Engineering System Design & Hardware Specifications
    story.append(Paragraph("2. Proposed Engineering System Design", h2_style))
    sys_data = [
        [Paragraph("<b>Item / Component</b>", body_style), Paragraph("<b>Specification / Brand</b>", body_style), Paragraph("<b>Qty / Capacity</b>", body_style), Paragraph("<b>Warranty</b>", body_style)],
        [Paragraph("Solar Modules", body_style), Paragraph(f"Alps Solar TOPCon High-Efficiency N-Type ({panel_wattage}W)", body_style), Paragraph(f"{panel_count} Panels ({round(panel_count*panel_wattage/1000, 2)} kW DC)", body_style), Paragraph("12-Yr Product / 25-Yr Performance", body_style)],
        [Paragraph("Solar Inverter", body_style), Paragraph("On-Grid / Hybrid Smart Inverter with Wi-Fi Monitoring", body_style), Paragraph(f"{system_kw} kW Three-Phase", body_style), Paragraph("5-Year Standard Warranty", body_style)],
        [Paragraph("Mounting Structure", body_style), Paragraph("Galvanized Iron (GI L2 / Elevated Custom)", body_style), Paragraph(f"Complete for {panel_count} Panels", body_style), Paragraph("10-Year Structural Integrity", body_style)],
        [Paragraph("Electrical & Protection", body_style), Paragraph("DC/AC Distribution Box, Lightning Arrestor, Surge Protection, Earthing", body_style), Paragraph("1 Complete Set", body_style), Paragraph("Tested to IEC Standards", body_style)],
        [Paragraph("Net Metering Service", body_style), Paragraph(f"WAPDA / {disco} Bi-Directional Green Meter Process & Filing", body_style), Paragraph("Turnkey Approval Scope", body_style), Paragraph("Guaranteed DISCO Processing", body_style)],
    ]
    sys_table = Table(sys_data, colWidths=[110, 190, 130, 110])
    sys_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(sys_table)
    story.append(Spacer(1, 10))

    # Financial & Generation Projections
    story.append(Paragraph("3. Estimated Generation, Financial ROI & Savings", h2_style))
    fin_data = [
        [Paragraph("<b>Est. Monthly Generation:</b>", body_style), Paragraph(f"{est_monthly_units:,.0f} kWh Units", body_style), Paragraph("<b>Est. Annual Generation:</b>", body_style), Paragraph(f"{est_monthly_units * 12:,.0f} kWh Units", body_style)],
        [Paragraph("<b>Est. Monthly Bill Savings:</b>", body_style), Paragraph(f"PKR {est_monthly_savings:,.0f}", body_style), Paragraph("<b>Est. Annual Bill Savings:</b>", body_style), Paragraph(f"PKR {est_annual_savings:,.0f}", body_style)],
        [Paragraph("<b>Estimated Turnkey Cost:</b>", body_style), Paragraph(f"PKR {est_cost:,.0f} (Approx.)", body_style), Paragraph("<b>Estimated Payback Period:</b>", body_style), Paragraph(f"<b>{payback} Years</b>", body_style)],
    ]
    fin_table = Table(fin_data, colWidths=[135, 135, 135, 135])
    fin_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(fin_table)
    story.append(Spacer(1, 10))

    # Warranty, Scope & After-Sales
    story.append(Paragraph("4. Installation Scope & Long-Term After-Sales Commitment", h2_style))
    scope_text = (
        "• <b>Turnkey Installation:</b> Complete civil works, electrical cabling, inverter commissioning, and live Wi-Fi app setup.<br/>"
        "• <b>Net Metering:</b> Complete liaison with DISCO engineers, inspection testing, and bi-directional meter activation.<br/>"
        "• <b>Post-Commissioning Monitoring:</b> 1-year complimentary remote performance tracking and free routine health checks.<br/>"
        "• <b>Authentic Hardware:</b> Direct supply chain traceability with technology partner Alps Solar."
    )
    story.append(Paragraph(scope_text, body_style))
    story.append(Spacer(1, 12))

    # Signoff Box
    sign_data = [
        [
            Paragraph("<b>Prepared by:</b><br/>J.I ENERGIES Engineering Team<br/>Clean Energy. Brighter Future.", small_style),
            Paragraph("<b>Authorized Acceptance:</b><br/>Client Signature: _______________________<br/>Date: _________________________________", small_style)
        ]
    ]
    sign_table = Table(sign_data, colWidths=[270, 270])
    sign_table.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(sign_table)

    doc.build(story)
    return buffer.getvalue()
