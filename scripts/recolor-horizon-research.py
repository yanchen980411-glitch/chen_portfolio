from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/projects/ag1/background-user-research.png"
OUTPUT = ROOT / "public/assets/projects/ag1/background-user-research-neutral.png"
ZH_OUTPUT = ROOT / "public/assets/projects/ag1/background-user-research-neutral-zh.png"
TARGET = (241, 243, 240)

# The source artwork contains both green UI ink and real golf-course imagery.
# Use a stricter chroma test inside photo regions so natural grass is preserved.
PHOTO_REGIONS = (
    (722, 247, 1365, 545),
    (39, 663, 746, 845),
)
PRODUCT_GLOW_REGION = (1125, 400, 1265, 535)


def inside_photo(x: int, y: int) -> bool:
    return any(left <= x < right and top <= y < bottom for left, top, right, bottom in PHOTO_REGIONS)


image = Image.open(SOURCE).convert("RGB")
pixels = image.load()

for y in range(image.height):
    for x in range(image.width):
        red, green, blue = pixels[x, y]
        if PRODUCT_GLOW_REGION[0] <= x < PRODUCT_GLOW_REGION[2] and PRODUCT_GLOW_REGION[1] <= y < PRODUCT_GLOW_REGION[3]:
            continue
        if inside_photo(x, y):
            is_accent = green >= 145 and green > red * 1.8 and green > blue * 1.5
        else:
            is_accent = green >= 105 and green - red >= 32 and green - blue >= 24
        if is_accent:
            # Keep antialiasing, glow falloff, and photographic light gradients;
            # full-strength UI pixels still resolve to the approved accent.
            intensity = min(1.0, green / 205)
            pixels[x, y] = tuple(round(channel * intensity) for channel in TARGET)

image.save(OUTPUT, optimize=True)
print(OUTPUT)


zh_image = image.copy()


def clear_copy_region(target: Image.Image, box: tuple[int, int, int, int], sample_x: int) -> None:
    """Replace baked text with adjacent artwork and feather the patch edge."""
    left, top, right, bottom = box
    replacement = target.copy()
    replacement_pixels = replacement.load()
    source_pixels = target.load()
    for y in range(top, bottom):
        color = source_pixels[sample_x, y]
        for x in range(left, right):
            replacement_pixels[x, y] = color

    mask = Image.new("L", target.size, 0)
    mask_pixels = mask.load()
    for y in range(top, bottom):
        for x in range(left, right):
            mask_pixels[x, y] = 255
    mask = mask.filter(ImageFilter.GaussianBlur(radius=12))
    target.paste(replacement, (0, 0), mask)
# Header, intro, traditional-experience labels and Horizon-opportunity labels.
# These are repopulated by the localized DOM, so the Chinese version can use
# the artwork itself as a seamless background instead of rectangular patches.
for region, sample_x in (
    ((0, 10, 870, 155), 900),
    ((0, 150, 500, 270), 560),
    ((45, 285, 450, 365), 560),
    ((45, 420, 560, 490), 560),
    ((175, 512, 500, 565), 560),
    ((680, 175, 1160, 260), 650),
    ((680, 535, 1280, 590), 650),
):
    clear_copy_region(zh_image, region, sample_x)

zh_image.save(ZH_OUTPUT, optimize=True)
print(ZH_OUTPUT)
