var resultMs = document.getElementById("resultMs");
var selectedNoteValue = document.getElementById("selectedNoteValue");
var selectedModifier = document.getElementById("selectedModifier");
var selectedTempo = document.getElementById("selectedTempo");

var resultDecimalsMs = document.getElementById("resultDecimalsMs");
var selectedDecimalsMs = document.getElementById("selectedDecimalsMs");


function calculateMs() {
    var modifier = selectedModifier.value;
    
    if(modifier == "" || modifier == "." || modifier == ".." || modifier == "...") {
        modifier = selectedModifier.value;
    } else {
        modifier = parseInt(selectedModifier.value);
    }
    
    if (selectedTempo.value != "") {
        var tempo = parseFloat(selectedTempo.value);
    } else {
        selectedTempo.value = 120;
        tempo = 120;
    }
    
    if (tempo < 0.001) {
        selectedTempo.value = 0.001;
        tempo = 0.001;
    } else if (tempo > 999999) {
        selectedTempo.value = 999999;
        tempo = 999999;
    }

    var ms = durationToMs(1 / parseInt(selectedNoteValue.value), modifier, tempo);

    ms = setDecimals(ms, selectedDecimalsMs.value);

    resultMs.innerHTML = ms;
    resultDecimalsMs.innerHTML = selectedDecimalsMs.value;
}

calculateMs();

selectedNoteValue.addEventListener("change", calculateMs);
selectedModifier.addEventListener("change", calculateMs);
selectedTempo.addEventListener("change", calculateMs);
selectedDecimalsMs.addEventListener("change", calculateMs);
