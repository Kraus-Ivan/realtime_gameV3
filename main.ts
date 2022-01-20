pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive)
let hra_zahajena = false
let nahodna_doba = 0
let vysledek_int = 0
let vysledek_str = "X"
let klic = false
control.inBackground(function startovac() {
    
    klic = true
    nahodna_doba = randint(3000, 10000)
    basic.pause(nahodna_doba)
    music.playTone(Note.C, music.beat(1500))
    hra_zahajena = true
})
basic.forever(function on_forever() {
    
    let is_pin1 = input.pinIsPressed(TouchPin.P1)
    let is_pin2 = input.pinIsPressed(TouchPin.P2)
    // console.log_value("String:", vysledek_str)
    // console.log_value("Integer:", vysledek_int)
    // console.log_value("hra zahajena:", hra_zahajena)
    // console.log_value("Klic:", klic)
    if (hra_zahajena && klic) {
        if (is_pin1 && is_pin2) {
            vysledek_str = "R"
            klic = false
        }
        
        if (is_pin1) {
            vysledek_int = 1
            klic = false
        }
        
        if (is_pin2) {
            vysledek_int = 2
            klic = false
        }
        
    } else if (klic) {
        if (is_pin1 && is_pin2) {
            vysledek_str = "C"
            klic = false
        }
        
        if (is_pin1) {
            vysledek_str = "B"
            klic = false
        }
        
        if (is_pin2) {
            vysledek_str = "A"
            klic = false
        }
        
    }
    
    vysledek()
})
function vysledek() {
    if (vysledek_str == "R") {
        basic.showString("R")
    } else if (vysledek_str == "B" && hra_zahajena) {
        basic.showString("B")
    } else if (vysledek_str == "A" && hra_zahajena) {
        basic.showString("A")
    } else if (vysledek_str == "C" && hra_zahajena) {
        basic.showString("C")
    } else if (vysledek_int == 1) {
        basic.showNumber(1)
    } else if (vysledek_int == 2) {
        basic.showNumber(2)
    }
    
}

