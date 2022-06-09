var btnScreenHertz = document.getElementById("btnScreenHertz");
var screenHertz = document.getElementById("screenHertz");

var btnScreenMs = document.getElementById("btnScreenMs");
var screenMs = document.getElementById("screenMs");

var btnScreenTap = document.getElementById("btnScreenTap");
var screenTap = document.getElementById("screenTap");

var btnScreenNote = document.getElementById("btnScreenNote");
var screenNote = document.getElementById("screenNote");

/*
selectedNavButton
*/

function setScreen(screen) {
    screenHertz.setAttribute("hidden", "");
    screenMs.setAttribute("hidden", "");
    screenNote.setAttribute("hidden", "");
    screenTap.setAttribute("hidden", "");

    btnScreenHertz.classList.remove("selectedNavButton");
    btnScreenMs.classList.remove("selectedNavButton");
    btnScreenTap.classList.remove("selectedNavButton");
    btnScreenNote.classList.remove("selectedNavButton");

    switch(screen) {
        case "hertz":
            screenHertz.removeAttribute("hidden");
            btnScreenHertz.classList.add("selectedNavButton");
            break;
        case "note":
            screenNote.removeAttribute("hidden");
            btnScreenNote.classList.add("selectedNavButton");
            break;
        case "ms":
            screenMs.removeAttribute("hidden");
            btnScreenMs.classList.add("selectedNavButton");
            break;
        case "tap":
            screenTap.removeAttribute("hidden");
            btnScreenTap.classList.add("selectedNavButton");
            break;
    }
}

btnScreenHertz.addEventListener("click", function(e) {
    setScreen("hertz");
});

btnScreenMs.addEventListener("click", function(e) {
    setScreen("ms");
});
btnScreenTap.addEventListener("click", function(e) {
    setScreen("tap");
});
btnScreenNote.addEventListener("click", function(e) {
    setScreen("note");
});