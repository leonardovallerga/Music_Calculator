// screen-note-to-hertz
var resultTuning = document.getElementById("resultTuning");
var resultDecimalsHertz = document.getElementById("resultDecimalsHertz");

var selectedNote = document.getElementById("selectedNote");
var selectedAccidental = document.getElementById("selectedAccidental");
var selectedOctave = document.getElementById("selectedOctave");
var selectedTuning = document.getElementById("selectedTuning");
var resetTuning = document.getElementById("resetTuning");
var selectedDecimalsHertz = document.getElementById("selectedDecimalsHertz");

var resultHertz = document.getElementById("resultHertz");
var resultMidi = document.getElementById("resultMidi");

function calculateHertz() {
    var tuning = selectedTuning.value;
    var decimals = selectedDecimalsHertz.value;

    var hertz = noteToHertz(selectedNote.value + selectedAccidental.value, parseInt(selectedOctave.value), parseInt(selectedTuning.value));

    var midi = noteToMidi(selectedNote.value + selectedAccidental.value, parseInt(selectedOctave.value));

    hertz = setDecimals(hertz, decimals);
    
    resultTuning.innerHTML = tuning;
    resultDecimalsHertz.innerHTML = decimals;
    resultHertz.innerHTML = hertz;
    resultMidi.innerHTML = midi;
}

calculateHertz();

selectedNote.addEventListener("change", calculateHertz);
selectedAccidental.addEventListener("change", calculateHertz);
selectedOctave.addEventListener("change", calculateHertz);
selectedTuning.addEventListener("change", calculateHertz);
selectedDecimalsHertz.addEventListener("change", calculateHertz);

resetTuning.addEventListener("click", function(e) {
    selectedTuning.value = 440;
    calculateHertz();
});
