pins.touch_set_mode(TouchTarget.P1, TouchTargetMode.CAPACITIVE)
pins.touch_set_mode(TouchTarget.P2, TouchTargetMode.CAPACITIVE)

hra_zahajena = False
nahodna_doba = 0
vysledek_int = 0
vysledek_str = "X"
klic = False

def startovac():
    global hra_zahajena, nahodna_doba, klic
    klic = True
    nahodna_doba = randint(3000, 10000)
    basic.pause(nahodna_doba)
    music.play_tone(Note.C, music.beat(1500))
    hra_zahajena = True
control.in_background(startovac)

def on_forever():
    global hra_zahajena, vysledek_int, vysledek_str, klic

    is_pin1 = input.pin_is_pressed(TouchPin.P1)
    is_pin2 = input.pin_is_pressed(TouchPin.P2)

    #console.log_value("String:", vysledek_str)
    #console.log_value("Integer:", vysledek_int)
    #console.log_value("hra zahajena:", hra_zahajena)
    #console.log_value("Klic:", klic)

    if hra_zahajena and klic:
        if is_pin1 and is_pin2:
            vysledek_str = "R"
            klic = False
        if is_pin1:
            vysledek_int = 1
            klic = False
        if is_pin2:
            vysledek_int = 2
            klic = False
    elif klic:
        if is_pin1 and is_pin2:
            vysledek_str = "C"
            klic = False
        if is_pin1:
            vysledek_str = "B"
            klic = False
        if is_pin2:
            vysledek_str = "A"
            klic = False
    vysledek()
basic.forever(on_forever)

def vysledek():
    if vysledek_str == "R":
        basic.show_string("R")
    elif vysledek_str == "B" and hra_zahajena:
        basic.show_string("B")
    elif vysledek_str == "A" and hra_zahajena:
        basic.show_string("A")
    elif vysledek_str == "C" and hra_zahajena:
        basic.show_string("C")
    elif vysledek_int == 1:
        basic.show_number(1)
    elif vysledek_int == 2:
        basic.show_number(2)