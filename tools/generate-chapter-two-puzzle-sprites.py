from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


OUT_DIR = Path("assets/sprites/chapter-two/puzzles")
SIZE = 256


def rgba(hex_color, alpha=255):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def blank():
    return Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))


def save(image, name):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    image.save(OUT_DIR / name)


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def glow_layer():
    return Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))


def draw_tile_base(lit=False):
    img = blank()
    draw = ImageDraw.Draw(img)
    fill = rgba("#344743", 246) if lit else rgba("#263737", 246)
    edge = rgba("#8ab9ad", 175) if lit else rgba("#55706a", 145)
    shadow = rgba("#10201f", 180)
    rounded_rect(draw, (20, 22, 236, 236), 26, shadow)
    rounded_rect(draw, (20, 16, 236, 228), 26, fill, edge, 5)
    rounded_rect(draw, (36, 34, 220, 212), 18, rgba("#1b2929", 60), rgba("#93b0a8", 45), 2)

    for x in (58, 104, 155, 199):
        draw.line((x, 42, x - 18, 205), fill=rgba("#9db0a9", 22 if lit else 15), width=2)
    for y in (62, 122, 184):
        draw.arc((32, y - 22, 224, y + 28), 188, 350, fill=rgba("#b8d5c9", 22 if lit else 13), width=2)

    if lit:
        glow = glow_layer()
        g = ImageDraw.Draw(glow)
        g.rounded_rectangle((29, 25, 227, 220), radius=22, fill=rgba("#9bd3c7", 70))
        img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(11)))
    return img


def draw_boardwalk_conduit():
    img = blank()
    draw = ImageDraw.Draw(img)
    shadow = rgba("#142321", 130)
    draw.rounded_rectangle((38, 100, 218, 156), radius=20, fill=shadow)
    draw.rounded_rectangle((34, 91, 222, 145), radius=20, fill=rgba("#8b6a43", 242), outline=rgba("#d2b47a", 190), width=4)
    for x in range(54, 212, 33):
        draw.line((x, 96, x - 8, 141), fill=rgba("#3d2f24", 115), width=5)
        draw.line((x + 4, 99, x - 4, 137), fill=rgba("#d5b783", 70), width=2)
    draw.line((48, 111, 208, 111), fill=rgba("#e0c58c", 82), width=3)
    draw.line((48, 132, 207, 132), fill=rgba("#503b27", 82), width=3)
    return img


def draw_reed_channel_conduit():
    img = blank()
    draw = ImageDraw.Draw(img)
    path = [(34, 134), (70, 126), (106, 132), (146, 118), (184, 124), (222, 112)]
    draw.line(path, fill=rgba("#19231c", 115), width=24, joint="curve")
    draw.line(path, fill=rgba("#6f8b56", 245), width=16, joint="curve")
    draw.line(path, fill=rgba("#bfd78d", 210), width=6, joint="curve")
    for base, tip in [((79, 126), (64, 80)), ((116, 129), (128, 88)), ((163, 121), (175, 76)), ((188, 123), (206, 164))]:
        draw.line((base[0], base[1], tip[0], tip[1]), fill=rgba("#6a8452", 220), width=7)
        draw.line((base[0], base[1], tip[0], tip[1]), fill=rgba("#c4d995", 145), width=2)
    for point in path[1:-1]:
        draw.ellipse((point[0] - 7, point[1] - 7, point[0] + 7, point[1] + 7), fill=rgba("#d8f49d", 120))
    return img


def draw_shallow_water_conduit():
    img = blank()
    glow = glow_layer()
    g = ImageDraw.Draw(glow)
    g.rounded_rectangle((34, 98, 222, 158), radius=26, fill=rgba("#7fd4cf", 70))
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(9)))

    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((32, 96, 224, 154), radius=24, fill=rgba("#315e62", 235), outline=rgba("#95dad7", 190), width=4)
    for y in (111, 128, 143):
        draw.arc((43, y - 18, 213, y + 18), 185, 352, fill=rgba("#c8f2ec", 105), width=3)
    draw.line((44, 126, 212, 126), fill=rgba("#bdeee6", 210), width=5)
    return img


def draw_start_node():
    img = blank()
    glow = glow_layer()
    g = ImageDraw.Draw(glow)
    g.ellipse((54, 54, 202, 202), fill=rgba("#d8f49d", 95))
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(18)))

    draw = ImageDraw.Draw(img)
    draw.ellipse((70, 70, 186, 186), fill=rgba("#315247", 248), outline=rgba("#d8f49d", 230), width=6)
    draw.ellipse((95, 95, 161, 161), fill=rgba("#b7cf76", 245), outline=rgba("#f0ffb8", 220), width=4)
    draw.ellipse((115, 115, 141, 141), fill=rgba("#f4ffd0", 245))
    for angle in range(0, 360, 45):
        # Integer-only star ticks to keep the asset crisp.
        import math

        r1, r2 = 47, 62
        cx = cy = 128
        a = math.radians(angle)
        draw.line((cx + math.cos(a) * r1, cy + math.sin(a) * r1, cx + math.cos(a) * r2, cy + math.sin(a) * r2), fill=rgba("#d8f49d", 190), width=4)
    return img


def draw_output_node():
    img = blank()
    glow = glow_layer()
    g = ImageDraw.Draw(glow)
    g.ellipse((65, 62, 191, 200), fill=rgba("#ffe08a", 68))
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(14)))

    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((82, 76, 174, 184), radius=28, fill=rgba("#5d6045", 248), outline=rgba("#d2b56f", 225), width=6)
    draw.ellipse((101, 89, 155, 143), fill=rgba("#ffe3a3", 230), outline=rgba("#fff0bd", 230), width=4)
    draw.rectangle((113, 144, 143, 175), fill=rgba("#7b613c", 245))
    draw.line((94, 184, 162, 184), fill=rgba("#c7a76a", 220), width=7)
    return img


def draw_selection_frame():
    img = blank()
    glow = glow_layer()
    g = ImageDraw.Draw(glow)
    g.rounded_rectangle((22, 22, 234, 234), radius=31, outline=rgba("#f1d06e", 120), width=14)
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(6)))

    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((26, 26, 230, 230), radius=29, outline=rgba("#ffe08a", 245), width=8)
    draw.rounded_rectangle((42, 42, 214, 214), radius=20, outline=rgba("#8fd9f0", 185), width=3)
    for x, y in [(26, 26), (206, 26), (26, 206), (206, 206)]:
        draw.rounded_rectangle((x, y, x + 24, y + 24), radius=6, fill=rgba("#ffe08a", 238))
    return img


def draw_completion_spark():
    img = blank()
    glow = glow_layer()
    g = ImageDraw.Draw(glow)
    g.ellipse((62, 62, 194, 194), fill=rgba("#ffe08a", 120))
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(16)))

    draw = ImageDraw.Draw(img)
    cx = cy = 128
    rays = [
        (0, 68),
        (45, 45),
        (90, 60),
        (135, 42),
        (180, 64),
        (225, 42),
        (270, 58),
        (315, 45),
    ]
    import math

    for angle, length in rays:
        a = math.radians(angle)
        draw.line((cx, cy, cx + math.cos(a) * length, cy + math.sin(a) * length), fill=rgba("#ffe08a", 220), width=8)
    draw.ellipse((102, 102, 154, 154), fill=rgba("#f8ffd7", 245), outline=rgba("#d8f49d", 210), width=4)
    draw.ellipse((119, 119, 137, 137), fill=rgba("#ffffff", 245))
    return img


def make_contact_sheet(files):
    cell = 160
    label_h = 24
    sheet = Image.new("RGBA", (cell * 3, (cell + label_h) * 3), rgba("#1b2525", 255))
    for index, file_name in enumerate(files):
        src = Image.open(OUT_DIR / file_name).convert("RGBA")
        src.thumbnail((126, 126))
        x = (index % 3) * cell + (cell - src.width) // 2
        y = (index // 3) * (cell + label_h) + 10
        sheet.alpha_composite(src, (x, y))
        d = ImageDraw.Draw(sheet)
        d.text(((index % 3) * cell + 8, y + 132), file_name.replace(".png", ""), fill=rgba("#d7e3d7", 255))
    return sheet


def main():
    outputs = [
        ("wetland-tile-base.png", draw_tile_base(False)),
        ("wetland-tile-lit.png", draw_tile_base(True)),
        ("boardwalk-conduit.png", draw_boardwalk_conduit()),
        ("reed-channel-conduit.png", draw_reed_channel_conduit()),
        ("shallow-water-conduit.png", draw_shallow_water_conduit()),
        ("wetland-start-node.png", draw_start_node()),
        ("wetland-output-node.png", draw_output_node()),
        ("wetland-selection-frame.png", draw_selection_frame()),
        ("wetland-completion-spark.png", draw_completion_spark()),
    ]
    for name, image in outputs:
        save(image, name)
    make_contact_sheet([name for name, _ in outputs]).save(OUT_DIR / "chapter-two-puzzle-sprites-contact-sheet.png")


if __name__ == "__main__":
    main()
