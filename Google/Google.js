document.getElementById("GSearch").onsearch = function() {myFunction()};

function myFunction(){
    var x = document.getElementById("GSearch");
    window.open(`https://www.google.com/search?q=${document.querySelector("input").value}`, "_blank")
};

function SearchFunction() {
    var x = document.getElementById("GSearch");
    window.open(`https://www.google.com/search?q=${document.querySelector("input").value}`, "_blank")
}