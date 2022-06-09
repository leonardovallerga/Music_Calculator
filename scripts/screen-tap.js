var tapButton = document.getElementById("tapButton");
var resetTap = document.getElementById("resetTap");
var textTempo = document.getElementById("textTempo");

var tapInterval = 0;

// 0 to 3 store date; 4 to 7 store differences between dates
var history = [0, 0, 0, 0, 0, 0, 0, 0];

function countTempo() {
    tapInterval++;

    var average = 0;

    if (tapInterval == 1) {
        history[0] = Date.now();
        return NaN;
    } else if (tapInterval == 2) {
        history[1] = Date.now();
        history[4] = history[1] - history[0];
        return msToTempo(history[4]);
    } else if (tapInterval == 3) {
        history[2] = Date.now();
        history[5] = history[2] - history[1];
        average = (history[4] + history[5]) / 2;
        return msToTempo(average);
    } else if (tapInterval == 4) {
        history[3] = Date.now();
        history[6] = history[3] - history[2];
        average = (history[4] + history[5] + history[6]) / 3;
        return msToTempo(average);
    } else if (tapInterval % 4 == 1) {
        history[0] = Date.now();
        history[7] = history[0] - history[3];
        average = (history[4] + history[5] + history[6] + history[7]) / 4;
        return msToTempo(average);
    } else if (tapInterval % 4 == 2) {
        history[1] = Date.now();
        history[4] = history[1] - history[0];
        average = (history[4] + history[5] + history[6] + history[7]) / 4;
        return msToTempo(average);
    } else if (tapInterval % 4 == 3) {
        history[2] = Date.now();
        history[5] = history[2] - history[1];
        average = (history[4] + history[5] + history[6] + history[7]) / 4;
        return msToTempo(average);
    } else if (tapInterval % 4 == 0) {
        history[3] = Date.now();
        history[6] = history[3] - history[2];
        average = (history[4] + history[5] + history[6] + history[7]) / 4;
        return msToTempo(average);
    }
}

tapButton.addEventListener("mousedown", function(e) {
    var tempo = countTempo();
    if (tapInterval != 1) {
        textTempo.innerHTML = setDecimals(tempo, 1);
    }
});

resetTap.addEventListener("mousedown", function(e) {
    tapInterval = 0;
    history = [0, 0, 0, 0, 0, 0, 0, 0];
    textTempo.innerHTML = 0;
});
