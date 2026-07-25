from PIL import Image
import os

public = "public"
files = [
    "living-infrastructure-board.png",
    "living-infrastructure-board-full.png",
    "prismatic-infill-board-full.png",
]

for f in files:
    path = os.path.join(public, f)
    if os.path.exists(path):
        img = Image.open(path)
        size_mb = os.path.getsize(path) / (1024 * 1024)
        print(f"{f}: {img.size[0]}x{img.size[1]} pixels, {size_mb:.2f} MB")
    else:
        print(f"{f}: NOT FOUND")
