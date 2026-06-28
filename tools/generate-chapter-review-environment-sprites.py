from pathlib import Path
from random import Random

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
BG_SIZE = (1774, 887)
PATH_SIZE = (1836, 320)
RNG = Random(28)
REFERENCE_SHEET = ROOT / "assets/sprites/reference/chapter-review-background-reference.png"


def rgba(color):
    if len(color) == 4:
        return color
    return (*color, 255)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def blend(c1, c2, t):
    c1 = rgba(c1)
    c2 = rgba(c2)
    return tuple(lerp(c1[i], c2[i], t) for i in range(4))


def gradient(size, stops):
    width, height = size
    image = Image.new("RGBA", size)
    draw = ImageDraw.Draw(image)
    for y in range(height):
        p = y / max(1, height - 1)
        left = stops[0]
        right = stops[-1]
        for i in range(len(stops) - 1):
            if stops[i][0] <= p <= stops[i + 1][0]:
                left = stops[i]
                right = stops[i + 1]
                break
        local = 0 if right[0] == left[0] else (p - left[0]) / (right[0] - left[0])
        draw.line((0, y, width, y), fill=blend(left[1], right[1], local))
    return image


def add_glow(image, x, y, radius, color, alpha=130):
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for step in range(10, 0, -1):
        r = radius * step / 10
        a = int(alpha * (step / 10) ** 2)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*color[:3], a))
    image.alpha_composite(overlay)


def add_vignette(image):
    width, height = image.size
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(80):
        alpha = int(1.6 * i)
        draw.rectangle((i, i, width - i, height - i), outline=(4, 10, 14, alpha), width=2)
    image.alpha_composite(overlay)


def cover_resize(image, size):
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    scaled = image.resize((int(image.width * scale), int(image.height * scale)), Image.Resampling.LANCZOS)
    left = (scaled.width - target_w) // 2
    top = (scaled.height - target_h) // 2
    return scaled.crop((left, top, left + target_w, top + target_h)).convert("RGBA")


def reference_background(panel_index, fallback):
    if not REFERENCE_SHEET.exists():
        return fallback()

    sheet = Image.open(REFERENCE_SHEET).convert("RGBA")
    panel_h = sheet.height // 4
    top = panel_index * panel_h + 4
    bottom = (panel_index + 1) * panel_h - 4
    image = cover_resize(sheet.crop((0, top, sheet.width, bottom)), BG_SIZE)
    image = Image.blend(gradient(BG_SIZE, [(0, (4, 10, 14, 255)), (1, (12, 18, 18, 255))]), image, 0.93)
    add_vignette(image)
    return image


def reference_path(panel_index, fallback):
    if not REFERENCE_SHEET.exists():
        return fallback()

    sheet = Image.open(REFERENCE_SHEET).convert("RGBA")
    panel_h = sheet.height // 4
    top = panel_index * panel_h
    crop_top = top + int(panel_h * 0.52)
    crop = sheet.crop((0, crop_top, sheet.width, top + panel_h - 4))
    image = cover_resize(crop, PATH_SIZE)

    alpha = Image.new("L", PATH_SIZE, 0)
    alpha_draw = ImageDraw.Draw(alpha)
    for y in range(PATH_SIZE[1]):
        fade = max(0, min(1, (y - 22) / 136))
        alpha_draw.line((0, y, PATH_SIZE[0], y), fill=int(232 * fade))

    image.putalpha(alpha)
    return image.filter(ImageFilter.GaussianBlur(0.15))


def draw_rain(draw, width, height, count, alpha=24):
    for _ in range(count):
        x = RNG.randint(-100, width + 100)
        y = RNG.randint(0, height)
        length = RNG.randint(26, 64)
        draw.line((x, y, x - 15, y + length), fill=(190, 218, 220, alpha), width=1)


def draw_mist(draw, width, y, color=(170, 207, 202, 38)):
    for x in range(-260, width + 340, 330):
        draw.ellipse((x, y - 28, x + 520, y + 42), fill=color)


def draw_window(draw, x, y, w, h, lit=True):
    frame = (23, 28, 31, 235)
    glass = (247, 177, 82, 230) if lit else (36, 74, 86, 190)
    draw.rounded_rectangle((x, y, x + w, y + h), radius=4, fill=frame)
    draw.rounded_rectangle((x + 4, y + 4, x + w - 4, y + h - 4), radius=3, fill=glass)
    draw.line((x + w / 2, y + 4, x + w / 2, y + h - 4), fill=(33, 33, 30, 160), width=2)


def draw_lantern(image, draw, x, y, scale=1.0):
    pole_h = 150 * scale
    draw.line((x, y, x, y - pole_h), fill=(20, 19, 18, 245), width=max(2, int(5 * scale)))
    draw.rounded_rectangle((x - 18 * scale, y - pole_h - 34 * scale, x + 18 * scale, y - pole_h + 20 * scale), radius=int(8 * scale), fill=(20, 17, 15, 235), outline=(95, 66, 43, 210), width=2)
    draw.rounded_rectangle((x - 12 * scale, y - pole_h - 25 * scale, x + 12 * scale, y - pole_h + 12 * scale), radius=int(5 * scale), fill=(255, 181, 78, 220))
    add_glow(image, x, y - pole_h - 4 * scale, 80 * scale, (255, 181, 78), 62)


def draw_cobble_band(draw, y0, y1, width, palette, alpha=235, jitter=12):
    for y in range(y0, y1, 34):
        offset = (y // 34 % 2) * 32
        for x in range(-80 + offset, width + 80, 64):
            h = RNG.randint(24, 42)
            w = RNG.randint(52, 78)
            color = (*RNG.choice(palette), alpha)
            draw.rounded_rectangle((x + RNG.randint(-jitter, jitter), y + RNG.randint(-5, 5), x + w, y + h), radius=8, fill=color, outline=(13, 22, 24, 120), width=2)


def draw_tree(draw, x, y, scale=1.0, apples=True, dark=False):
    trunk = (47, 31, 23, 255) if not dark else (29, 22, 20, 255)
    leaf1 = (43, 74, 48, 245) if not dark else (21, 44, 38, 235)
    leaf2 = (68, 102, 54, 235) if not dark else (34, 63, 48, 220)
    draw.line((x, y, x + 18 * scale, y - 180 * scale), fill=trunk, width=int(24 * scale))
    draw.line((x + 8 * scale, y - 108 * scale, x - 82 * scale, y - 202 * scale), fill=trunk, width=int(13 * scale))
    draw.line((x + 10 * scale, y - 126 * scale, x + 110 * scale, y - 222 * scale), fill=trunk, width=int(12 * scale))
    for ox, oy, rx, ry, color in [
        (-110, -236, 126, 76, leaf1),
        (-24, -278, 152, 88, leaf2),
        (104, -234, 126, 76, leaf1),
        (6, -196, 166, 76, leaf1),
    ]:
        draw.ellipse((x + (ox - rx) * scale, y + (oy - ry) * scale, x + (ox + rx) * scale, y + (oy + ry) * scale), fill=color)
    if apples:
        for _ in range(int(20 * scale)):
            ax = x + RNG.randint(-130, 140) * scale
            ay = y + RNG.randint(-310, -185) * scale
            r = RNG.randint(5, 8) * scale
            draw.ellipse((ax - r, ay - r, ax + r, ay + r), fill=(145, 48, 40, 230), outline=(63, 25, 24, 180))


def draw_orchard_background():
    image = gradient(BG_SIZE, [
        (0.0, (9, 24, 38, 255)),
        (0.46, (24, 55, 69, 255)),
        (0.72, (35, 76, 62, 255)),
        (1.0, (20, 32, 27, 255)),
    ])
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = BG_SIZE
    draw.polygon([(0, 455), (250, 355), (540, 425), (820, 330), (1130, 430), (1450, 352), (width, 430), (width, height), (0, height)], fill=(18, 44, 49, 175))
    draw.polygon([(0, 548), (320, 500), (650, 526), (1040, 484), (1420, 536), (width, 492), (width, height), (0, height)], fill=(18, 55, 42, 225))
    for x in range(70, width, 170):
        draw.line((x, 584, x, 676), fill=(48, 34, 23, 230), width=8)
    draw.line((30, 612, width - 30, 638), fill=(61, 40, 25, 220), width=10)
    draw.line((30, 656, width - 30, 678), fill=(45, 34, 24, 220), width=8)
    for x, y, s in [(155, 710, 1.45), (392, 685, 1.08), (670, 642, 0.78), (1004, 626, 0.72), (1300, 674, 1.05), (1612, 710, 1.44)]:
        draw_tree(draw, x, y, s, apples=True, dark=x in (670, 1004))
    draw.rounded_rectangle((820, 474, 984, 576), radius=8, fill=(65, 50, 38, 230), outline=(32, 29, 26, 220), width=3)
    draw.polygon([(792, 474), (902, 396), (1012, 474)], fill=(37, 34, 34, 240), outline=(20, 20, 20, 220))
    draw_window(draw, 850, 504, 36, 34, True)
    draw_window(draw, 918, 504, 36, 34, True)
    draw_lantern(image, draw, 120, 704, 0.75)
    draw_lantern(image, draw, 1560, 704, 0.72)
    draw_cobble_band(draw, 654, 887, width, [(45, 63, 55), (33, 52, 52), (56, 66, 51)], 160)
    draw_mist(draw, width, 552, (160, 194, 187, 24))
    draw_rain(draw, width, height, 360, 22)
    add_vignette(image)
    return image


def draw_glassworks_background():
    image = gradient(BG_SIZE, [
        (0.0, (8, 22, 37, 255)),
        (0.46, (22, 48, 66, 255)),
        (0.76, (22, 38, 43, 255)),
        (1.0, (15, 24, 25, 255)),
    ])
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = BG_SIZE
    draw.polygon([(0, 515), (180, 410), (420, 468), (650, 380), (910, 486), (1190, 370), (1450, 468), (width, 392), (width, height), (0, height)], fill=(19, 34, 45, 220))
    for i, x in enumerate(range(80, width, 210)):
        h = RNG.randint(125, 230)
        y = 610 - h
        draw.rectangle((x, y, x + 138, 620), fill=(37, 45, 48, 235), outline=(18, 24, 27, 210), width=3)
        draw.polygon([(x - 18, y), (x + 68, y - 62), (x + 156, y)], fill=(31, 34, 37, 245))
        for wx in (x + 28, x + 84):
            draw_window(draw, wx, y + 38, 28, 38, i % 2 == 0)
        if i % 3 == 0:
            draw.rectangle((x + 110, y - 76, x + 136, y), fill=(30, 31, 33, 230))
            draw.ellipse((x + 96, y - 94, x + 150, y - 60), fill=(48, 63, 70, 70))
    for x, y, w, h, c in [
        (250, 494, 278, 146, (49, 122, 135, 150)),
        (870, 430, 310, 205, (64, 153, 158, 142)),
        (1198, 486, 230, 136, (61, 124, 133, 140)),
    ]:
        draw.rounded_rectangle((x, y, x + w, y + h), radius=34, fill=c, outline=(86, 157, 158, 165), width=5)
        for k in range(1, 5):
            px = x + w * k / 5
            draw.line((px, y + 10, px - w * 0.08, y + h - 8), fill=(152, 227, 221, 80), width=2)
    draw.arc((835, 330, 1235, 742), 180, 360, fill=(126, 201, 196, 120), width=6)
    draw.rectangle((842, 535, 1230, 640), fill=(48, 52, 52, 230), outline=(18, 21, 22, 210), width=3)
    for wx in range(890, 1195, 58):
        draw_window(draw, wx, 562, 32, 42, True)
        add_glow(image, wx + 16, 583, 54, (255, 141, 54), 48)
    draw_lantern(image, draw, 178, 704, 0.7)
    draw_lantern(image, draw, 1510, 704, 0.72)
    draw_cobble_band(draw, 642, 887, width, [(41, 66, 70), (37, 56, 60), (60, 72, 70), (40, 86, 92)], 165)
    for x in range(140, width, 260):
        draw.line((x, 650, x + 170, 818), fill=(86, 178, 178, 48), width=4)
    draw_mist(draw, width, 552, (141, 195, 202, 26))
    draw_rain(draw, width, height, 420, 24)
    add_vignette(image)
    return image


def draw_under_village_background():
    image = gradient(BG_SIZE, [
        (0.0, (7, 13, 17, 255)),
        (0.42, (15, 28, 32, 255)),
        (0.72, (24, 34, 31, 255)),
        (1.0, (11, 18, 18, 255)),
    ])
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = BG_SIZE
    draw.rectangle((0, 0, width, height), fill=(6, 11, 14, 68))
    for x in range(-120, width, 260):
        draw.ellipse((x, -100, x + 420, 420), fill=(26, 32, 32, 160), outline=(48, 47, 42, 105), width=6)
    draw.polygon([(0, 610), (155, 540), (360, 586), (560, 510), (815, 600), (1040, 506), (1320, 590), (1560, 528), (width, 598), (width, height), (0, height)], fill=(33, 40, 38, 235))
    draw.rounded_rectangle((702, 452, 1094, 650), radius=30, fill=(22, 35, 39, 230), outline=(62, 71, 65, 180), width=8)
    draw.arc((642, 336, 1164, 762), 180, 360, fill=(78, 83, 76, 165), width=12)
    draw.rectangle((0, 700, width, 806), fill=(9, 39, 48, 178))
    for x in range(40, width, 220):
        draw.rectangle((x, 650, x + 150, 735), fill=(43, 37, 29, 230), outline=(21, 20, 19, 210), width=3)
        draw.line((x - 22, 650, x + 172, 650), fill=(91, 66, 41, 230), width=8)
        draw_window(draw, x + 44, 674, 46, 38, True)
    for x in range(120, width, 340):
        draw.line((x, 210, x, 732), fill=(74, 49, 31, 210), width=16)
        draw.line((x - 28, 212, x + 28, 212), fill=(50, 36, 27, 210), width=10)
        draw.line((x - 28, 400, x + 28, 400), fill=(50, 36, 27, 210), width=8)
    for x in range(-80, width + 120, 140):
        draw.arc((x, 558, x + 170, 820), 188, 352, fill=(66, 72, 66, 150), width=6)
    for x in range(130, width, 310):
        draw_lantern(image, draw, x, 690, 0.68)
    for x in range(260, width, 420):
        draw.line((x, 510, x + 280, 496), fill=(62, 73, 71, 190), width=12)
        draw.line((x, 529, x + 280, 515), fill=(21, 29, 31, 220), width=5)
    draw_cobble_band(draw, 652, 887, width, [(43, 50, 45), (32, 40, 39), (55, 54, 45)], 170)
    for _ in range(24):
        x = RNG.randint(0, width)
        y = RNG.randint(470, 765)
        draw.ellipse((x, y, x + RNG.randint(3, 6), y + RNG.randint(3, 6)), fill=(103, 205, 162, 115))
    draw_mist(draw, width, 590, (114, 168, 159, 28))
    add_vignette(image)
    return image


def draw_festival_background():
    image = gradient(BG_SIZE, [
        (0.0, (9, 25, 39, 255)),
        (0.48, (29, 54, 64, 255)),
        (0.72, (42, 51, 46, 255)),
        (1.0, (21, 29, 27, 255)),
    ])
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = BG_SIZE
    draw.polygon([(0, 532), (180, 472), (390, 506), (610, 430), (830, 516), (1100, 430), (1350, 518), (1560, 456), (width, 500), (width, height), (0, height)], fill=(27, 41, 47, 230))
    for x in range(120, width, 260):
        y = RNG.randint(472, 540)
        draw.rectangle((x, y, x + 170, 650), fill=(52, 50, 42, 236), outline=(22, 24, 25, 210), width=3)
        draw.polygon([(x - 28, y), (x + 85, y - 70), (x + 198, y)], fill=(38, 37, 36, 245))
        draw_window(draw, x + 32, y + 46, 36, 40, True)
        draw_window(draw, x + 96, y + 46, 36, 40, True)
    draw.polygon([(270, 666), (420, 488), (590, 666)], fill=(119, 43, 36, 238), outline=(49, 30, 25, 220))
    draw.polygon([(420, 488), (507, 666), (590, 666)], fill=(220, 171, 98, 225))
    draw.rounded_rectangle((300, 636, 560, 720), radius=14, fill=(70, 43, 32, 230), outline=(30, 24, 22, 210), width=4)
    draw.rounded_rectangle((1160, 534, 1430, 706), radius=12, fill=(58, 44, 35, 230), outline=(29, 25, 22, 210), width=4)
    draw.polygon([(1132, 534), (1296, 446), (1458, 534)], fill=(112, 68, 48, 238))
    draw_window(draw, 1224, 580, 48, 44, True)
    draw_window(draw, 1310, 580, 48, 44, True)
    for y, sag in [(250, 66), (312, 42)]:
        points = []
        for i in range(9):
            x = 60 + i * 220
            points.append((x, y + (i % 2) * sag))
        draw.line(points, fill=(51, 34, 25, 230), width=4)
        for i in range(len(points) - 1):
            x0, y0 = points[i]
            x1, y1 = points[i + 1]
            for k in range(1, 4):
                t = k / 4
                px = x0 + (x1 - x0) * t
                py = y0 + (y1 - y0) * t
                color = RNG.choice([(236, 161, 65), (91, 150, 137), (179, 76, 61), (229, 207, 120)])
                draw.polygon([(px - 18, py), (px + 18, py), (px, py + 44)], fill=(*color, 220))
                add_glow(image, px, py + 20, 45, color, 24)
    for x in range(120, width, 260):
        draw_lantern(image, draw, x, 710, 0.72)
    draw_cobble_band(draw, 644, 887, width, [(54, 58, 53), (45, 52, 52), (61, 55, 48), (52, 67, 60)], 175)
    for _ in range(90):
        x = RNG.randint(0, width)
        y = RNG.randint(635, 830)
        color = RNG.choice([(220, 78, 61), (227, 182, 75), (77, 152, 137), (216, 218, 161)])
        draw.rectangle((x, y, x + 8, y + 3), fill=(*color, 145))
    draw_mist(draw, width, 560, (175, 188, 172, 22))
    draw_rain(draw, width, height, 330, 19)
    add_vignette(image)
    return image


def create_path_base():
    return Image.new("RGBA", PATH_SIZE, (0, 0, 0, 0))


def draw_orchard_path():
    image = create_path_base()
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = PATH_SIZE
    draw.polygon([(0, 178), (360, 112), (748, 132), (1112, 96), (width, 150), (width, height), (0, height)], fill=(45, 50, 34, 225))
    draw.polygon([(0, 214), (470, 148), (1010, 180), (width, 118), (width, height), (0, height)], fill=(62, 50, 34, 236))
    for _ in range(130):
        x = RNG.randint(0, width)
        y = RNG.randint(120, height)
        color = RNG.choice([(43, 72, 45), (36, 60, 42), (97, 79, 42), (112, 43, 35)])
        if color == (112, 43, 35):
            draw.ellipse((x, y, x + 11, y + 9), fill=(*color, 180))
        else:
            draw.line((x, y, x + RNG.randint(-10, 10), y - RNG.randint(8, 22)), fill=(*color, 150), width=2)
    for x in range(40, width, 190):
        draw.arc((x, 144, x + 280, 360), 190, 330, fill=(54, 33, 23, 148), width=8)
    draw_cobble_band(draw, 178, height, width, [(68, 63, 45), (49, 54, 42), (77, 70, 48)], 105, 18)
    return image.filter(ImageFilter.GaussianBlur(0.25))


def draw_glassworks_path():
    image = create_path_base()
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = PATH_SIZE
    draw.polygon([(0, 150), (430, 110), (934, 142), (width, 100), (width, height), (0, height)], fill=(29, 50, 56, 230))
    draw_cobble_band(draw, 120, height, width, [(43, 68, 73), (36, 55, 62), (63, 74, 72), (43, 88, 98)], 185, 20)
    for x in range(-60, width, 115):
        color = RNG.choice([(82, 190, 184), (134, 100, 204), (226, 151, 67), (84, 148, 196)])
        draw.polygon([(x, 156), (x + 56, 122), (x + 130, 146), (x + 88, 188)], fill=(*color, 72), outline=(*color, 118))
    for x in range(100, width, 260):
        draw.line((x, 120, x + 180, height), fill=(134, 222, 216, 54), width=4)
    return image.filter(ImageFilter.GaussianBlur(0.2))


def draw_under_village_path():
    image = create_path_base()
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = PATH_SIZE
    draw.polygon([(0, 128), (360, 100), (872, 140), (width, 104), (width, height), (0, height)], fill=(40, 44, 39, 238))
    draw.rectangle((0, 236, width, 292), fill=(8, 42, 48, 152))
    draw.line((0, 230, width, 206), fill=(72, 62, 48, 218), width=14)
    draw.line((0, 296, width, 274), fill=(71, 61, 48, 220), width=12)
    draw_cobble_band(draw, 116, height, width, [(46, 50, 45), (34, 42, 40), (58, 55, 46)], 192, 18)
    for x in range(90, width, 240):
        draw.rounded_rectangle((x, 160, x + 126, 190), radius=6, fill=(28, 31, 31, 210), outline=(91, 88, 76, 140), width=2)
        for k in range(6):
            draw.line((x + 10 + k * 18, 162, x + 10 + k * 18, 188), fill=(86, 95, 91, 120), width=2)
    for _ in range(38):
        x = RNG.randint(0, width)
        y = RNG.randint(120, 260)
        draw.ellipse((x, y, x + 6, y + 6), fill=(94, 200, 151, 110))
    return image.filter(ImageFilter.GaussianBlur(0.2))


def draw_festival_path():
    image = create_path_base()
    draw = ImageDraw.Draw(image, "RGBA")
    width, height = PATH_SIZE
    draw.polygon([(0, 132), (420, 108), (890, 146), (width, 112), (width, height), (0, height)], fill=(53, 56, 50, 238))
    draw_cobble_band(draw, 112, height, width, [(58, 62, 56), (47, 55, 55), (70, 62, 51), (54, 70, 62)], 194, 16)
    for _ in range(130):
        x = RNG.randint(0, width)
        y = RNG.randint(118, height)
        color = RNG.choice([(222, 76, 60), (228, 181, 70), (82, 151, 135), (211, 217, 158)])
        draw.polygon([(x, y), (x + 12, y + RNG.randint(-2, 2)), (x + 4, y + 8)], fill=(*color, 160))
    for x in range(60, width, 240):
        draw.ellipse((x - 60, 176, x + 80, 306), fill=(251, 171, 76, 32))
    return image.filter(ImageFilter.GaussianBlur(0.2))


def complete_cliff_rope_lift():
    source = Image.open(ROOT / "assets/sprites/chapter-four/landmarks/cliff-rope-lift.png").convert("RGBA")
    canvas = Image.new("RGBA", (source.width + 32, source.height + 96), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas, "RGBA")
    offset_x = 16
    offset_y = 76
    draw.line((offset_x + 28, offset_y + 8, offset_x + 28, 28), fill=(47, 32, 24, 255), width=17)
    draw.line((offset_x + source.width - 28, offset_y + 8, offset_x + source.width - 28, 28), fill=(47, 32, 24, 255), width=17)
    draw.line((offset_x + 30, 28, offset_x + source.width - 30, 28), fill=(53, 35, 25, 255), width=18)
    draw.line((offset_x + 36, 37, offset_x + source.width - 36, 37), fill=(91, 55, 31, 240), width=7)
    draw.ellipse((offset_x + 134, 6, offset_x + 202, 74), fill=(32, 29, 25, 255), outline=(116, 76, 34, 245), width=5)
    draw.ellipse((offset_x + 153, 25, offset_x + 183, 55), fill=(126, 83, 35, 255), outline=(24, 20, 18, 230), width=3)
    draw.line((offset_x + 167, 42, offset_x + 76, offset_y + 62), fill=(121, 76, 43, 255), width=7)
    draw.line((offset_x + 169, 42, offset_x + source.width - 76, offset_y + 62), fill=(121, 76, 43, 255), width=7)
    draw.line((offset_x + 171, 74, offset_x + 171, offset_y + 78), fill=(117, 75, 44, 255), width=6)
    canvas.alpha_composite(source, (offset_x, offset_y))
    return canvas


def extend_hill_descent():
    source = Image.open(ROOT / "assets/sprites/world/hill-descent.png").convert("RGBA")
    canvas = Image.new("RGBA", (560, 430), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.polygon([(206, 250), (344, 250), (548, 392), (514, 430), (186, 430), (130, 368)], fill=(49, 52, 45, 226))
    draw.polygon([(238, 278), (350, 272), (536, 382), (486, 418), (202, 414), (150, 360)], fill=(69, 64, 50, 238))
    for y in range(296, 426, 30):
        draw.line((160, y, 518, y - 8), fill=(29, 33, 33, 105), width=3)
    for x in range(176, 520, 58):
        draw.line((x, 296, x + 28, 428), fill=(25, 29, 29, 90), width=2)
    for _ in range(42):
        x = RNG.randint(176, 520)
        y = RNG.randint(278, 420)
        draw.rounded_rectangle((x, y, x + RNG.randint(28, 54), y + RNG.randint(14, 26)), radius=4, fill=(*RNG.choice([(62, 67, 58), (73, 66, 50), (43, 52, 50)]), 150), outline=(18, 25, 26, 80), width=1)
    draw.ellipse((318, 308, 546, 424), fill=(65, 88, 82, 42))
    draw.line((402, 312, 522, 390), fill=(236, 179, 82, 95), width=5)
    canvas.alpha_composite(source, (58, 0))
    return canvas


def save(image, relative_path):
    path = ROOT / relative_path
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path)
    print(relative_path)


def main():
    outputs = {
        "assets/sprites/chapter-seven/backgrounds/orchard-background.png": reference_background(0, draw_orchard_background),
        "assets/sprites/chapter-seven/paths/orchard-path.png": reference_path(0, draw_orchard_path),
        "assets/sprites/chapter-eight/backgrounds/glassworks-background.png": reference_background(1, draw_glassworks_background),
        "assets/sprites/chapter-eight/paths/glassworks-path.png": reference_path(1, draw_glassworks_path),
        "assets/sprites/chapter-nine/backgrounds/under-village-background.png": reference_background(2, draw_under_village_background),
        "assets/sprites/chapter-nine/paths/under-village-path.png": reference_path(2, draw_under_village_path),
        "assets/sprites/chapter-ten/backgrounds/festival-background.png": reference_background(3, draw_festival_background),
        "assets/sprites/chapter-ten/paths/festival-path.png": reference_path(3, draw_festival_path),
        "assets/sprites/chapter-four/landmarks/cliff-rope-lift-complete.png": complete_cliff_rope_lift(),
        "assets/sprites/world/hill-descent-road.png": extend_hill_descent(),
    }
    for relative_path, image in outputs.items():
        save(image, relative_path)


if __name__ == "__main__":
    main()
