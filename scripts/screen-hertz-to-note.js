var resultNote0 = document.getElementById("resultNote0");
var resultNote1 = document.getElementById("resultNote1");
var resultNote2 = document.getElementById("resultNote2");

var selectedHertz = document.getElementById("selectedHertz");

var selectedTuningNote = document.getElementById("selectedTuningNote");
var resultTuningNote = document.getElementById("resultTuningNote");

var selectedDecimalsNote = document.getElementById("selectedDecimalsNote");
var resultDecimalsNote = document.getElementById("resultDecimalsNote");

var resetTuningNote = document.getElementById("resetTuningNote");


function calculateNote() {
    var hertz = selectedHertz.value;
    
    if (hertz < 0.001) {
        selectedHertz.value = 0.001;
        hertz = 0.001;
    } else if (hertz > 999999999) {
        selectedHertz.value = 999999999;
        hertz = 999999999;
    }

    var noteArray = hertzToNote(hertz, selectedTuningNote.value);
    var cents = setDecimals(noteArray[1], selectedDecimalsNote.value);

    if (cents >= 0) {
        cents = "+" + cents;
    }

    resultNote0.innerHTML = noteArray[0];
    resultNote1.innerHTML = cents;
    resultNote2.innerHTML = noteArray[2];

    resultTuningNote.innerHTML = selectedTuningNote.value;
    resultDecimalsNote.innerHTML = selectedDecimalsNote.value;
}

calculateNote();

selectedHertz.addEventListener("change", calculateNote);
selectedTuningNote.addEventListener("change", calculateNote);
selectedDecimalsNote.addEventListener("change", calculateNote);

resetTuningNote.addEventListener("click", function(e) {
    selectedTuningNote.value = 440;
    calculateNote();
});
