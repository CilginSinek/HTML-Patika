let UserName = prompt("İsminiz Lütfen");


while (!(UserName)) {
    UserName = prompt("Geçerli bir isim girin");
}

let myName = document.querySelector("#myName");
myName.innerHTML = `${UserName}`;

const currentTime = () => {
    const el = document.querySelector(".clock")
    const days = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
    var dateTime = new Date();

    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var day = days[dateTime.getDay()]

    hrs = hrs < 10 ? `0${hrs}` : hrs;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    
    let time = `${hrs}:${min}:${sec}   ${day}`
    el.innerText = time     
};
currentTime();
setInterval(currentTime, 1000)