function Tanimlama() {

    const calculatorMain = document.querySelector(".calculatorMain");


    const SonucVeInput = document.createElement("div");
    SonucVeInput.classList.add("SonucVeInput");
    calculatorMain.appendChild(SonucVeInput);

    const NumbsAndFunc = document.createElement("div");
    NumbsAndFunc.classList.add("NumbsAndFunc");
    calculatorMain.appendChild(NumbsAndFunc);

    const NameArea = document.createElement("div");
    NameArea.classList.add("NameArea");
    NameArea.innerHTML = 'My Awesome Calculator';
    SonucVeInput.appendChild(NameArea);

    SonucArea.classList.add("SonucArea");
    SonucVeInput.appendChild(SonucArea);

    InputArea.classList.add("InputArea");
    SonucVeInput.appendChild(InputArea);


    SonucArea.appendChild(SonucText);
    SonucText.innerHTML = "Sonuc"
    SonucText.style.fontSize = "x-large"
    SonucInt.style.fontSize ="xx-large"
    SonucArea.appendChild(SonucInt);



    ACButton.classList.add("Button");
    ArtiEksiButton.classList.add("Button");
    YuzdeButton.classList.add("Button");
    DuzeltmeButton.classList.add("Button");

    YediButton.classList.add("Button");
    YediButton.classList.add("Sayi");
    SekizButton.classList.add("Button");
    SekizButton.classList.add("Sayi");
    DokuzButton.classList.add("Button");
    DokuzButton.classList.add("Sayi");
    BoluButton.classList.add("Button");
    BoluButton.classList.add("isaret");

    DortButton.classList.add("Button");
    DortButton.classList.add("Sayi");
    BesButton.classList.add("Button");
    BesButton.classList.add("Sayi");
    AltiButton.classList.add("Button");
    AltiButton.classList.add("Sayi");
    CarpiButton.classList.add("Button");
    CarpiButton.classList.add("isaret");

    BirButton.classList.add("Button");
    BirButton.classList.add("Sayi");
    IkiButton.classList.add("Button");
    IkiButton.classList.add("Sayi");
    UcButton.classList.add("Button");
    UcButton.classList.add("Sayi");
    EksiButton.classList.add("Button");
    EksiButton.classList.add("isaret")

    VirgulButton.classList.add("Button");
    SifirButton.classList.add("Button");
    SifirButton.classList.add("Sayi");
    EsitButton.classList.add("Button");
    ArtiButton.classList.add("Button");
    ArtiButton.classList.add("isaret");

    NumbsAndFunc.appendChild(ACButton);
    NumbsAndFunc.appendChild(ArtiEksiButton);
    NumbsAndFunc.appendChild(YuzdeButton);
    NumbsAndFunc.appendChild(DuzeltmeButton);
    NumbsAndFunc.appendChild(YediButton);
    NumbsAndFunc.appendChild(SekizButton);
    NumbsAndFunc.appendChild(DokuzButton);
    NumbsAndFunc.appendChild(BoluButton);
    NumbsAndFunc.appendChild(DortButton);
    NumbsAndFunc.appendChild(BesButton);
    NumbsAndFunc.appendChild(AltiButton);
    NumbsAndFunc.appendChild(CarpiButton);
    NumbsAndFunc.appendChild(BirButton);
    NumbsAndFunc.appendChild(IkiButton);
    NumbsAndFunc.appendChild(UcButton);
    NumbsAndFunc.appendChild(EksiButton);
    NumbsAndFunc.appendChild(VirgulButton);
    NumbsAndFunc.appendChild(SifirButton);
    NumbsAndFunc.appendChild(EsitButton);
    NumbsAndFunc.appendChild(ArtiButton);

    BirButton.innerHTML = 1;
    IkiButton.innerHTML = 2;
    UcButton.innerHTML = 3;
    DortButton.innerHTML = 4;
    BesButton.innerHTML = 5;
    AltiButton.innerHTML = 6;
    YediButton.innerHTML = 7;
    SekizButton.innerHTML = 8;
    DokuzButton.innerHTML = 9;
    SifirButton.innerHTML = 0;

    ACButton.innerHTML = "AC";
    ArtiEksiButton.innerHTML ="+/-";
    YuzdeButton.innerHTML = "%";
    DuzeltmeButton.innerHTML = "<=";
    BoluButton.innerHTML = "/";
    CarpiButton.innerHTML = "x";
    EksiButton.innerHTML = "-";
    ArtiButton.innerHTML = "+";
    EsitButton.innerHTML = "=";
    VirgulButton.innerHTML =",";

}

export
    const

    InputArea = document.createElement("div"),

    ACButton = document.createElement("button"),
    ArtiEksiButton = document.createElement("button"),
    YuzdeButton = document.createElement("button"),
    DuzeltmeButton = document.createElement("button"),

    YediButton = document.createElement("button"),
    SekizButton = document.createElement("button"),
    DokuzButton = document.createElement("button"),
    BoluButton =document.createElement("button"),

    DortButton = document.createElement("button"),
    BesButton = document.createElement("button"),
    AltiButton = document.createElement("button"),
    CarpiButton = document.createElement("button"),

    BirButton = document.createElement("button"),
    IkiButton = document.createElement("button"),
    UcButton =document.createElement("button"),
    EksiButton = document.createElement("button"),

    VirgulButton = document.createElement("button"),
    SifirButton = document.createElement("button"),
    EsitButton = document.createElement("button"),
    ArtiButton = document.createElement("button"),

    SonucArea = document.createElement("div"),
    SonucText = document.createElement("div"),
    SonucInt = document.createElement("div");


export { Tanimlama }

