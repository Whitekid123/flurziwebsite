import sys, os
from PIL import Image
tile_dir, total, vh, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
files = sorted(f for f in os.listdir(tile_dir) if f.endswith(".png"))
first = Image.open(os.path.join(tile_dir, files[0]))
scale = first.width and first.height / vh
canvas = Image.new("RGB", (first.width, int(total * scale)))
for i, f in enumerate(files):
    img = Image.open(os.path.join(tile_dir, f))
    y = i * vh
    if y + vh > total:  # last tile: browser clamps scroll to total - vh
        img = img.crop((0, int((y + vh - total) * scale), img.width, img.height))
    canvas.paste(img, (0, int(y * scale)))
canvas.save(out, optimize=True)
