from PIL import Image, ImageDraw, ImageFont
import os

products_dir = r"c:\Users\yasir\Downloads\Jienergies\frontend\public\images\products"
projects_dir = r"c:\Users\yasir\Downloads\Jienergies\frontend\public\images\projects"
os.makedirs(products_dir, exist_ok=True)
os.makedirs(projects_dir, exist_ok=True)

NAVY = (11, 45, 91)
NAVY_DARK = (6, 26, 53)
YELLOW = (255, 193, 7)
GREEN = (34, 165, 89)
WHITE = (255, 255, 255)
LIGHT_BLUE = (30, 75, 138)
GRID_LINE = (50, 110, 190)

def draw_solar_panel(draw, w, h, title, subtitle):
    # Background gradient
    for y in range(h):
        r = int(NAVY_DARK[0] + (NAVY[0] - NAVY_DARK[0]) * y / h)
        g = int(NAVY_DARK[1] + (NAVY[1] - NAVY_DARK[1]) * y / h)
        b = int(NAVY_DARK[2] + (NAVY[2] - NAVY_DARK[2]) * y / h)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Solar panel frame
    fx, fy, fw, fh = 60, 40, w - 120, h - 100
    draw.rectangle([fx, fy, fx + fw, fy + fh], outline=(180, 195, 215), width=6, fill=(15, 38, 75))
    
    # Perspective solar cells
    cols, rows = 8, 4
    cell_w = fw // cols
    cell_h = fh // rows
    for c in range(cols):
        for r in range(rows):
            cx = fx + c * cell_w + 3
            cy = fy + r * cell_h + 3
            cw = cell_w - 6
            ch = cell_h - 6
            draw.rectangle([cx, cy, cx + cw, cy + ch], fill=(22, 54, 102), outline=(40, 85, 150), width=1)
            # Busbars
            for b_idx in range(1, 4):
                bx = cx + (cw * b_idx // 4)
                draw.line([(bx, cy), (bx, cy + ch)], fill=(120, 160, 220), width=1)

    # Accent badge
    draw.rounded_rectangle([fx + 20, fy + 20, fx + 180, fy + 55], radius=8, fill=YELLOW)
    draw.text((fx + 30, fy + 28), "ALPS SOLAR", fill=(0, 0, 0))

    # Tech Label bottom banner
    draw.rounded_rectangle([fx + 20, fy + fh - 45, fx + fw - 20, fy + fh - 15], radius=6, fill=(6, 26, 53))
    draw.text((fx + 35, fy + fh - 38), f"{title} • {subtitle}", fill=WHITE)

def draw_inverter(draw, w, h, title, rating):
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=(15, 28, 48))

    # Inverter chassis
    ix, iy, iw, ih = 150, 40, w - 300, h - 80
    draw.rounded_rectangle([ix, iy, ix + iw, iy + ih], radius=16, fill=(245, 247, 250), outline=(200, 210, 225), width=3)
    
    # Dark display window
    draw.rounded_rectangle([ix + 30, iy + 30, ix + iw - 30, iy + 140], radius=10, fill=(10, 20, 35))
    draw.text((ix + 50, iy + 45), f"SMART HYBRID INVERTER", fill=YELLOW)
    draw.text((ix + 50, iy + 70), f"RATING: {rating}", fill=GREEN)
    draw.text((ix + 50, iy + 95), "STATUS: NORMAL • GRID SYNC OK", fill=(150, 220, 255))

    # LED indicators
    draw.ellipse([ix + iw - 70, iy + 50, ix + iw - 55, iy + 65], fill=GREEN)
    draw.ellipse([ix + iw - 70, iy + 75, ix + iw - 55, iy + 90], fill=YELLOW)
    draw.ellipse([ix + iw - 70, iy + 100, ix + iw - 55, iy + 115], fill=(30, 80, 160))

    # Heat sink fins at bottom
    for fx in range(ix + 30, ix + iw - 30, 12):
        draw.line([(fx, iy + 160), (fx, iy + ih - 30)], fill=(180, 190, 205), width=4)

    # Title
    draw.text((ix + 30, iy + ih - 25), title, fill=(11, 45, 91))

def draw_battery(draw, w, h, title, capacity):
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=(8, 22, 42))

    bx, by, bw, bh = 140, 35, w - 280, h - 70
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=20, fill=(20, 32, 52), outline=GREEN, width=3)

    # Battery header
    draw.text((bx + 30, by + 25), "JIENERGIES POWERWALL", fill=WHITE)
    draw.text((bx + 30, by + 50), f"LiFePO4 LITHIUM STORAGE • {capacity}", fill=YELLOW)

    # Energy Bar gauge
    draw.rounded_rectangle([bx + 30, by + 85, bx + bw - 30, by + 130], radius=8, fill=(10, 18, 30), outline=(40, 60, 90), width=2)
    # 92% charge
    gauge_w = int((bw - 64) * 0.92)
    draw.rounded_rectangle([bx + 32, by + 87, bx + 32 + gauge_w, by + 128], radius=6, fill=GREEN)
    draw.text((bx + 45, by + 98), "STATE OF CHARGE: 92% • 6,000 CYCLES", fill=WHITE)

    # Spec details
    draw.text((bx + 30, by + 150), "• 48V / 51.2V Low Voltage Architecture", fill=(180, 195, 215))
    draw.text((bx + 30, by + 175), "• Built-in Smart BMS with CAN/RS485", fill=(180, 195, 215))
    draw.text((bx + 30, by + 200), "• 10-Year Full Performance Warranty", fill=(180, 195, 215))

def draw_structure(draw, w, h, title):
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=(12, 30, 58))

    # Steel trusses
    for i in range(4):
        x1 = 80 + i * 150
        draw.line([(x1, h - 50), (x1 + 40, 60)], fill=(200, 210, 225), width=6)
        draw.line([(x1 + 40, 60), (x1 + 140, 60)], fill=(220, 230, 245), width=6)
        draw.line([(x1, h - 50), (x1 + 140, 60)], fill=(160, 175, 195), width=3)

    draw.rounded_rectangle([60, h - 70, w - 60, h - 20], radius=10, fill=NAVY_DARK, outline=YELLOW, width=2)
    draw.text((80, h - 55), f"GALVANIZED STEEL L2/L3 MOUNTING • 150 KM/H WIND RESISTANT", fill=WHITE)

def draw_project(draw, w, h, title, location, kw):
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=(int(11 + 15 * y / h), int(45 + 10 * y / h), int(91 - 20 * y / h)))

    # Rooftop outline
    draw.polygon([(40, h - 80), (w // 2, 40), (w - 40, h - 80)], fill=(30, 55, 95), outline=(100, 130, 175), width=2)
    
    # Solar array on roof
    cols = 6
    rows = 3
    for r in range(rows):
        for c in range(cols):
            x = 120 + c * 75 + (r * 15)
            y = 90 + r * 45
            draw.rectangle([x, y, x + 65, y + 38], fill=(15, 38, 75), outline=YELLOW, width=1)

    # Info card overlay
    draw.rounded_rectangle([30, h - 80, w - 30, h - 15], radius=12, fill=(6, 26, 53), outline=(40, 80, 140), width=2)
    draw.text((45, h - 68), f"{kw}kW Solar Installation", fill=YELLOW)
    draw.text((45, h - 45), f"Location: {location} • WAPDA Net Metering Active", fill=WHITE)

# Generate Products
products = [
    ("alps-solar-585w.png", "draw_solar_panel", "Alps Solar 585W", "22.6% N-Type TOPCon"),
    ("alps-solar-610w.png", "draw_solar_panel", "Alps Solar 610W Ultra", "22.8% Bifacial Dual-Glass"),
    ("inverter-10kw.png", "draw_inverter", "10kW Hybrid Inverter", "10 kW Dual MPPT"),
    ("inverter-50kw.png", "draw_inverter", "50kW Commercial Inverter", "50 kW Quad MPPT"),
    ("battery-10kwh.png", "draw_battery", "Energy Wall 10.24kWh", "10.24 kWh"),
    ("mounting-structure.png", "draw_structure", "Heavy Gauge Structure", "")
]

for filename, func_name, t, sub in products:
    img = Image.new("RGB", (640, 360))
    d = ImageDraw.Draw(img)
    if func_name == "draw_solar_panel":
        draw_solar_panel(d, 640, 360, t, sub)
    elif func_name == "draw_inverter":
        draw_inverter(d, 640, 360, t, sub)
    elif func_name == "draw_battery":
        draw_battery(d, 640, 360, t, sub)
    elif func_name == "draw_structure":
        draw_structure(d, 640, 360, t)
    img.save(os.path.join(products_dir, filename), "PNG")
    print(f"Generated product asset: {filename}")

# Generate Projects
projects = [
    ("project-15kw-dha.png", "15kW Residential On-Grid", "DHA Phase 6, Lahore", 15),
    ("project-10kw-bahria.png", "10kW Hybrid System", "Bahria Town, Islamabad", 10),
    ("project-60kw-gulberg.png", "60kW Commercial Rooftop", "Gulberg III, Lahore", 60),
    ("project-250kw-karachi.png", "250kW Industrial Plant", "Korangi Industrial, Karachi", 250),
    ("project-35kw-faisalabad.png", "35kW Educational Campus", "Faisalabad", 35),
    ("project-500kw-multan.png", "500kW Agricultural Facility", "Multan Industrial Estate", 500)
]

for filename, title, loc, kw in projects:
    img = Image.new("RGB", (640, 360))
    d = ImageDraw.Draw(img)
    draw_project(d, 640, 360, title, loc, kw)
    img.save(os.path.join(projects_dir, filename), "PNG")
    print(f"Generated project asset: {filename}")

print("All local image assets generated successfully!")
