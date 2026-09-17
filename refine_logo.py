from PIL import Image
import os

img = Image.open(r"C:\Users\yasir\.gemini\antigravity\brain\8d1357ec-e199-4b42-8caa-f0a2eefae53a\scratch\extracted_images\page_5_img_1_9.png")
print("Size:", img.size)

# Let's inspect where the logo elements are:
# Let's scan horizontally across middle y=110 to see where pixels are non-background
bg_r, bg_g, bg_b = img.getpixel((5, 5))

def is_bg(pixel):
    return abs(pixel[0] - bg_r) < 15 and abs(pixel[1] - bg_g) < 15 and abs(pixel[2] - bg_b) < 15

# Find bounding box for logo (left side, before the divider line)
# In the screenshot, there is a thin gray vertical line separating the horizontal logo and the icon mark
# Let's find that divider line x coordinate
divider_x = 480
for x in range(400, 520):
    # check if vertical line of gray exists
    grays = [1 for y in range(40, 180) if abs(img.getpixel((x, y))[0] - 210) < 30 and abs(img.getpixel((x, y))[1] - 210) < 30]
    if len(grays) > 100:
        divider_x = x
        break

print("Divider line x:", divider_x)

# Left box: logo
min_x, min_y, max_x, max_y = 650, 270, 0, 0
for x in range(10, divider_x - 10):
    for y in range(10, 210):
        if not is_bg(img.getpixel((x, y))):
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

print("Horizontal logo bounds:", (min_x, min_y, max_x, max_y))

# Crop horizontal logo cleanly with 4px padding
pad = 4
logo_crop = img.crop((max(0, min_x - pad), max(0, min_y - pad), min(divider_x, max_x + pad), min(h:=img.height, max_y + pad)))

# Save high-res PNG
public_img_dir = r"c:\Users\yasir\Downloads\Jienergies\frontend\public\images"
logo_crop.save(os.path.join(public_img_dir, "logo_raw.png"))

# Create clean transparent PNG
logo_rgba = logo_crop.convert("RGBA")
pixels = logo_rgba.load()
for x in range(logo_crop.width):
    for y in range(logo_crop.height):
        p = pixels[x, y]
        if is_bg(p) or (p[0] > 240 and p[1] > 240 and p[2] > 240):
            pixels[x, y] = (255, 255, 255, 0)

logo_rgba.save(os.path.join(public_img_dir, "logo.png"))
print("Saved clean transparent logo.png, size:", logo_rgba.size)

# Right box: icon mark
min_x, min_y, max_x, max_y = 650, 270, 0, 0
for x in range(divider_x + 10, img.width - 10):
    for y in range(10, 210):
        if not is_bg(img.getpixel((x, y))):
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

print("Icon mark bounds:", (min_x, min_y, max_x, max_y))
icon_crop = img.crop((max(0, min_x - pad), max(0, min_y - pad), min(img.width, max_x + pad), min(img.height, max_y + pad)))
icon_crop.save(os.path.join(public_img_dir, "logo_icon.png"))
print("Saved logo_icon.png, size:", icon_crop.size)
