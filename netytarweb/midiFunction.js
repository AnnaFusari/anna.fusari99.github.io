var midi = null;
var currentOutput = null;

var newPitch = null;
var oldPitch = null;

var currentCircle = null;
var oldCircle =null;

var oldId = null;

var noteOffCheck = true; // variabile per avere suono continuo con tasto tenuto premuto

function onMIDISuccess(midiAccess) {
    document.getElementById("console").style.display = "none";
    midi = midiAccess;
    getDefaultOutput();
}

function onMIDIFailure() {
    document.getElementById("console").innerHTML = "<h1>Attenzione: impossibile caricare la Web MIDI API</h1>";
}

function startMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
        document.getElementById("console").innerHTML = "<h1>Attenzione: browser non compatibile!</h1>";
    }
}

function changeOutput(outputId) {
    currentOutput = midi.outputs.get(outputId);
    //currentOutput.send([0xC0, 13]);
}

function getDefaultOutput() {
    // sfrutto variabile globale
    var outputsToString = "";
    midi.outputs.forEach(function (output, key) {
            if (outputsToString == "") {
                outputsToString += "<option selected='selected' value='" + key + "'>" + output.name + "</option>";
                changeOutput(key);
            }
            else
                outputsToString += "<option value='" + key + "'>" + output.name + "</option>";
        }
    );
    document.getElementById("chooseOutput").innerHTML = outputsToString;
}


//identifica il cerchio al quale si fa riferimento e il pitch
function sendNote(pitch, id){
    if((oldId!=null)&&(oldId!=id)){
        oldCircle = document.getElementById(oldId);
        oldCircle.style.stroke = "black";
        oldCircle.style.strokeWidth= "1";
        noteOffCheck = true;
    }
    newPitch = pitch;
    currentCircle = document.getElementById(id);
    currentCircle.style.stroke = "white";
    currentCircle.style.strokeWidth= "6";
    oldId = id;
}


//noteOn
document.addEventListener('keydown', function (noteOn) {
    if (noteOn.key === 'p') { //rendere minuscolo noteOn.key
        if(noteOffCheck == true){
            currentOutput.send([0x80, oldPitch, 0]);

            document.getElementById("pitch").innerHTML = newPitch;
            currentOutput.send([144, newPitch, 96]);

            oldPitch = newPitch;
            noteOffCheck = false;
        }
    }
});

//noteOff
document.addEventListener('keyup', function (noteOff) {
    if (noteOff.key === 'p') {//rendere minuscolo noteOn.key
        currentOutput.send([0x80, oldPitch, 0]);
        noteOffCheck = true;
    }
});


function stop(){
    currentOutput.send([0x80, oldPitch, 0]);
    currentCircle.style.stroke = "black";
    currentCircle.style.strokeWidth= "1";
}

//aggiungere program change per cambiare timbro