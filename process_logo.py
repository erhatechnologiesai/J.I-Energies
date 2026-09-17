from PIL import Image
import os

img = Image.open(r"C:\Users\yasir\.gemini\antigravity\brain\8d1357ec-e199-4b42-8caa-f0a2eefae53a\scratch\extracted_images\page_5_img_1_9.png")
print("Original size:", img.size)

# Let's save a copy in frontend/public/images/
public_img_dir = r"c:\Users\yasir\Downloads\Jienergies\frontend\public\images"
os.makedirs(public_img_dir, exist_ok=True)

# In page_5_img_1_9.png:
# Left side is the horizontal logo with text JIENERGIES
# Right side is the icon mark in dark navy square
# Let's crop them:
# Width is 650, height is 270.
# The horizontal logo is approx x from 20 to 480, y from 20 to 220
# The icon is approx x from 490 to 630, y from 20 to 220

w, h = img.size
# Let's crop primary horizontal logo
# Let's find bounding box of non-white pixels
bg_color = img.getpixel((5, 5))
print("Background color near corner:", bg_color)

# Crop horizontal logo (left ~75% of image, excluding labels at bottom)
horizontal_logo = img.crop((15, 20, 480, 200))
horizontal_logo.save(os.path.join(public_img_dir, "logo_extracted.png"))

# Make transparent background version: replace white/near-white with transparent
rgba = horizontal_logo.convert("RGBA")
datas = rgba.getdata()
new_data = []
for item in datas:
    # If pixel is close to white (background is white #FFFFFF or #FDFDFD)
    if item[0] > 245 and item[1] > 245 and item[2] > 245:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)
rgba.putdata(new_data)
rgba.save(os.path.join(public_img_dir, "logo.png"), "PNG")
print("Saved logo.png (transparent)")

# Crop icon mark (right ~25% of image)
icon_mark = img.crop((485, 20, 630, 200))
icon_mark.save(os.path.join(public_img_dir, "logo_icon.png"))
print("Saved logo_icon.png")
