
// ("C", -1) = 0; ("A", 4) = 69; ("G", 9) = 127;
function noteToMidi(stringNote, octave) {
  stringNote = stringNote.toLowerCase();
  var indexNote = null; // 1, 3, 5, 6, 8, 10 12; C to B
  var accidental = null; // 0 none, 1 sharp, -1 flat, 2, -2

  if (stringNote.length < 1 && stringNote.length > 2) {
    return NaN;
  }
  
  // first character
  switch (stringNote[0]) {
    case "c":
    indexNote = 1;
    break;

    case "d":
    indexNote = 3;
    break;

    case "e":
    indexNote = 5;
    break;

    case "f":
    indexNote = 6;
    break;

    case "g":
    indexNote = 8;
    break;

    case "a":
    indexNote = 10;
    break;

    case "b":
    indexNote = 12;
    break;

    default:
    return NaN;
  }

  // second character
  if (stringNote[1] == "#" || stringNote[1] == "b" || stringNote[1] == "x" || stringNote[1] == "h") {
    switch (stringNote[1]) {
      case "#":
      accidental = 1;
      break;

      case "b":
      accidental = -1;
      break;

      case "x":
      accidental = 2;
      break;

      case "h": // double flat
      accidental = -2;
      break;
      }
    } else {
      if (stringNote.length > 1) {
        return NaN;
      }
    }

  indexNote = indexNote + accidental;

  if (indexNote > 12) {
    indexNote -= 12;
  }

  indexNote -= 1;
  octave += 1;

  return indexNote + (octave * 12);
}

// returns ['A', octave]
function midiToNote(note) {
  var octave = Math.floor((note / 12) - 1);
  var indexNote = (note - ((octave + 1) * 12)) + 1;

  var name = "";
  switch (indexNote) {
    case 1:
      name = "C";
      break;
    case 2:
      name = "C# / Db";
      break;
    case 3:
      name = "D";
      break;
    case 4:
      name = "D# / Eb";
      break;
    case 5:
      name = "E";
      break;
    case 6:
      name = "F";
      break;
    case 7:
      name = "F# / Gb";
      break;
    case 8:
      name = "G";
      break;
    case 9:
      name = "G# / Ab";
      break;
    case 10:
      name = "A";
      break;
    case 11:
      name = "A# / Bb";
      break;
    case 12:
      name = "B";
      break;
  }

  return [name, octave];
}

function midiToHertz(note, tuning) {
  return Math.pow(2, (note - 69) / 12) * tuning;
}

function noteToHertz(note, octave, tuning) {
  return midiToHertz(noteToMidi(note, octave), tuning);
}

// returns ['A', +/- cents, octave]
function hertzToNote(hertz, tuning) {
  var note = 12 * Math.log2(hertz / tuning) + 69;
  var roundNote = Math.round(note);
  var text = midiToNote(roundNote);
  var cents = 0;

  if (note == roundNote) {
    return [text[0], cents, text[1]];
  }

  var referenceHertz = midiToHertz(roundNote, tuning);
  cents = hertzToCents(hertz, referenceHertz);

  return [text[0], cents, text[1]];
}

function hertzToCents(hertz1, hertz2) {
  var cents1 = 1200 * Math.log2(hertz1);
  var cents2 = 1200 * Math.log2(hertz2);

  return cents1 - cents2;
}

/*  noteValue: 1  1/2  1/4  1/8  (...)  1/128
    modifier: ""  "."  ".."  "..."  3  5  7   */ 
function durationToMs(noteValue, modifier, tempo) {
  if (noteValue != 1 && noteValue != 1/2 && noteValue != 1/4 && noteValue != 1/8 && noteValue != 1/16 && noteValue != 1/32 && noteValue != 1/64 && noteValue != 1/128) {
    return NaN;
  }

  if (tempo <= 0) {
    return NaN;
  }

  var ms = (240000 / tempo) * noteValue;

  switch (modifier) {
    case 0:
      break;

    case "":
      break;

    case ".":
      ms *= 1.5;
      break;

    case "..":
      ms *= (1.5 * 1.25);
      break;

    case "...":
      ms *= (1.5 * 1.25 * 1.125);
      break;

    case 3:
      ms = (ms * 4) / 3;
      break;

    case 5:
      ms = (ms * 4) / 5;
      break;

    case 7:
      ms = (ms * 8) / 7;
      break;

    default:
    return NaN;
  }
  
  return ms;
}

function msToTempo(ms) {
  return 1 / ms * 60000;
}

////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
function setDecimals(num, decimals) {
  var multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
}
