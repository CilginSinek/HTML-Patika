import { Tanimlama, InputArea, ACButton, ArtiEksiButton, YuzdeButton, DuzeltmeButton, YediButton, SekizButton, DokuzButton, BoluButton, DortButton, BesButton, AltiButton, CarpiButton, BirButton, IkiButton, UcButton, EksiButton, VirgulButton, SifirButton, EsitButton, ArtiButton, SonucInt } from './index.js';

Tanimlama()

const sayilar = document.querySelectorAll(".Sayi");
const isaretler = document.querySelectorAll(".isaret")
let ilkdegerVar = false;
let ilkdeger = "";
let ikinciDegerVar = false;
let ikinciDeger = "";
let isaret = "";
let Sonuc = 0;

ACButton.addEventListener('click', function () {
    InputArea.innerHTML = "";
    SonucInt.innerHTML = "";
    ilkdegerVar = false;
    ilkdeger = "";
    ikinciDegerVar = false;
    ikinciDeger = "";
    isaret = "";
    Sonuc = 0;
})
DuzeltmeButton.addEventListener('click', function () {
    InputArea.innerHTML = InputArea.innerHTML.slice(0, -1);

    if (ilkdegerVar === false) {
        ilkdeger = ilkdeger.toString().split('').slice(0, -1).join('');

    } else {
        ikinciDeger = ikinciDeger.toString().split('').slice(0, -1).join('');

    }


})

for (let i = 0; i < sayilar.length; i++) {
    sayilar[i].addEventListener('click', (el) => {
        let atr = el.target.innerHTML;
        if (ilkdegerVar === false) {
            IlkDegerOl(atr)
        }
        if (ikinciDegerVar === false) {
            ikinciDegerOl(atr)
        }
    })
}

function IlkDegerOl(el) {
    InputArea.innerHTML = "";
    ilkdeger += el;
    InputArea.innerHTML = ilkdeger;
    ilkdeger = +ilkdeger
};
function ikinciDegerOl(el) {
    if (ilkdeger != "" && isaret != "") {
        ikinciDeger += el;
        InputArea.innerHTML = ikinciDeger;
        ikinciDeger = +ikinciDeger;
    }
};
function IsaretOl() {
    for (let i = 0; i < isaretler.length; i++) {
        isaretler[i].addEventListener('click', (el) => {
            isaret = el.target.innerHTML;
            ilkdegerVar = true;
        })
    }
};
IsaretOl();

EsitButton.addEventListener('click', () => {
    InputArea.innerHTML = "";

    if (isaret === "+") {
        Sonuc = ilkdeger + ikinciDeger;
    } else if (isaret === "-") {
        Sonuc = ilkdeger - ikinciDeger;
    } else if (isaret === "x") {
        Sonuc = ilkdeger * ikinciDeger;
    } else if (isaret === "/") {
        Sonuc = ilkdeger / ikinciDeger;
    }
    SonucInt.innerHTML = Sonuc;
    ilkdeger = Sonuc;
    ikinciDeger = ""
    isaret = "";
    console.log(typeof(Sonuc))
})

ArtiEksiButton.addEventListener('click', () => {
    InputArea.innerHTML = "";
    if (ilkdeger != "") {
        Sonuc = -ilkdeger;
        ilkdeger = Sonuc;
    }
    if (ilkdeger != "" && ikinciDeger != "" && isaret != "") {
        Sonuc = -Sonuc
    }
    SonucInt.innerHTML = Sonuc
})

YuzdeButton.addEventListener('click', () =>{
    InputArea.innerHTML = "";
    if (ilkdeger != "") {
        Sonuc = ilkdeger / 100;
        ilkdeger = Sonuc;
    }
    if (ilkdeger != "" && ikinciDeger != "" && isaret != "") {
        Sonuc = Sonuc / 100;
    }
    SonucInt.innerHTML = Sonuc
})
