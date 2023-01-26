var noteBoardBase; //array 14x14 contentente tutti i pitch, rappresenta la base dell'intera lavagna di pallini, che poi verranno modificati nel colore in base alla scelta
var midiNotesBase; //la base su cui si compongono tutte le scale, è un array di 12 note con corrispettivo valore di pitch.

var referenceScale; //scelta della scala di riferimento (maj, min)
var scaleArray; // array contenente il salto di semitoni per ottenere la scala maj o minore
var pos1;
var pos2;
var pos3;
var pos4;

var referenceNote;
var midiNotesReference; // array base di una precisa scala, cicla su midinotesbase in modo tale da creare una base per creare midiNootesScale.
var midiNotesScale; // array intero di una precisa scala e nota, rappresenta più ottave

var distancex;

var scaleNameSet;

function setVariablesValue(){
    noteBoardBase = Array(14).fill().map(() => Array(14));
    midiNotesScale = Array(0).fill().map(() => Array(2)); // array di una precisa scala

    scaleArray = [];
    pos1 = 0;
    pos2 = 0;
    pos3 = 0;
    pos4 = 0;

    midiNotesBase = [["C0", 12], ["sC0", 13], ["D0" , 14], ["sD0" , 15], ["E0" , 16], ["F0" , 17], ["sF0" , 18], ["G0" , 19], ["sG0" , 20], ["A0" , 21], ["sA0" , 22], ["B0" , 23]];
    midiNotesReference = Array(12).fill().map(() => Array(2)); // array base di una precisa scala
}

function reloadBoard(){
    setVariablesValue();
    referenceNote = document.getElementById("noteInput").value;
    referenceScale = document.getElementById("scaleInput").value;
    distancex = document.getElementById("circleDistance").value;
    scaleNameSet = document.getElementById("noteName");
    drawboard();
    console.log(mi);
}

function drawboard(){
    let firstNoteInLine = 66;
    for (let i = 0; i < 14; i++ ){
        for (let j = 0; j < 14; j++ ){
            if((j == 0) && (i%2 == 0)){
                noteBoardBase[i][j]=firstNoteInLine;
                firstNoteInLine -= 1;
            }else if((j == 0) && (i%2 != 0)){
                noteBoardBase[i][j]=firstNoteInLine;
                firstNoteInLine -= 3;
            }else{
                noteBoardBase[i][j]=noteBoardBase[i][j-1] +2;
            }
        }
    }

    switch(referenceScale){
        case "maj":
            scaleArray = [0, 2, 4, 5, 7, 9, 11 ];

            pos1=4;
            pos2=11;
            pos3=5;
            pos4=0;
            break;
        case "min":
            scaleArray = [0, 2, 3, 5, 7, 8, 10 ];

            pos1=2;
            pos2=7;
            pos3=3;
            pos4=8;
            break;
        default:
            scaleArray = [0, 2, 4, 5, 7, 9, 11 ];
    }

    for(let i=0; i<midiNotesBase.length; i++){
        if(midiNotesBase[i][0].slice(0, -1) === referenceNote){
            for(let j = 0; j < midiNotesBase.length; j++) {
                if (i == midiNotesBase.length) {
                    i = 0;
                }
                midiNotesReference[j][0] = midiNotesBase[i][0];
                midiNotesReference[j][1] = midiNotesBase[i][1];
                i += 1;
            }
        }
    }

    for (let i = 1; i <= 9; i++ ) {
        for (let j = 0; j < scaleArray.length; j++ ){
            midiNotesScale.push([midiNotesReference[scaleArray[j]][0].slice(0,-1)+i, midiNotesReference[scaleArray[j]][1]+(12*i)]);
        }
    }

    let svg = "";
    let line = "";
    let distancey = distancex/2;
    for (let i = 0; i < 14; i++) {
        svg += "<svg width="+15*distancex+" height="+15*distancey+">";
        for (let j = 0; j < 14; j++) {
            line = i;
            let x = 50+j*distancex;
            let y = 50+i*distancey;

            let xright = 50+(j+1)*distancex - distancex/2;
            let ydown = 50+(i+1)*distancey;

            let xleft = 50+(j-1)*distancex + distancex/2;

            if(i%2!=0){
                x+= distancex/2;
                xright+= distancex/2;
                xleft+= distancex/2;
            }
            svg += "<line x1="+x+" y1="+y+" x2="+x+distancex+" y2="+y+" stroke=\" "+ setLineColor("nextleft", i, j) +" \" stroke-width=\"5\" />"+
                "<line x1="+x+" y1="+y+" x2="+xright+" y2="+ydown+" stroke=\" "+ setLineColor("downright", i, j) +" \" stroke-width=\"5\" />"+
                "<line x1="+x+" y1="+y+" x2="+xleft+" y2="+ydown+" stroke=\" "+ setLineColor("downleft", i, j) +" \" stroke-width=\"5\" />"+
                "<circle id=\"Circle"+line+noteBoardBase[i][j]+ " \" cx="+x+" cy="+y+" r=\"30\" stroke=\"black\" stroke-width=\"1\" fill= \" "+ setColorPerScale(noteBoardBase[i][j]) + " \"/>" +
                "<circle onmouseover=\"sendNote("+noteBoardBase[i][j]+ ", 'Circle"+line+noteBoardBase[i][j]+ " ')\"  cx="+x+" cy="+y+" r=\"60\" style=\"fill:transparent;stroke:transparent;stroke-width:3;opacity:0.5\" />"+
                "<text x="+(x-8)+" y="+(y+60)+" fill='white' > "+setNoteName(noteBoardBase[i][j])+" </text>";
        }
    }
    svg += "</svg>";
    document.getElementById("musicBoard").innerHTML = svg;
}

function setNoteName(pitch){
    let temporaryNames = "";
    for (let i = 0; i < midiNotesScale.length; i++) {
        if ((midiNotesScale[i][1] == pitch)&&(scaleNameSet.checked == true)) {
            if(midiNotesScale[i][0][0]=="s"){
                temporaryNames=midiNotesScale[i][0][1]+"#"+midiNotesScale[i][0][2];
                return temporaryNames;
            }else{
                return midiNotesScale[i][0];
            }

        }
    }
    return "";
}

function setColorPerScale(pitch){
    for (let i = 0; i < midiNotesScale.length; i++){
        if(midiNotesScale[i][1] == pitch){
            switch(midiNotesScale[i][0].slice(0,-1)){
                case "C":
                    return "red";
                    break;
                case "D":
                    return "orange";
                    break;
                case "E":
                    return "yellow";
                    break;
                case "F":
                    return "lightblue";
                    break;
                case "G":
                    return "blue";
                    break;
                case "A":
                    return "purple";
                    break;
                case "B":
                    return "pink";
                    break;
                case "sC":
                    return "darkred";
                    break;
                case "sD":
                    return "darksalmon";
                    break;
                case "sF":
                    return "deepskyblue";
                    break;
                case "sG":
                    return "darkblue";
                    break;
                case "sA":
                    return "rebeccapurple";
                    break;
                default:
                    return "gray";
            }
        }
    }
    return "gray";
}

function setLineColor(position, col, lin){
    let lineColor = "black";
    if(referenceScale=="maj"){
        lineColor="red";
    }else{
        lineColor="blue";
    }
    for (let i = 0; i < midiNotesScale.length; i++){
        if(midiNotesScale[i][1] == noteBoardBase[col][lin]){
            if((position == "nextleft")&&(midiNotesScale[i][0].slice(0,-1) != midiNotesReference[pos1][0].slice(0,-1))&&(midiNotesScale[i][0].slice(0,-1) != midiNotesReference[pos2][0].slice(0,-1))){
                if(lin==13){
                    return "black";
                }else{
                    return lineColor;
                }
            }
            if((position=="downright")&&(midiNotesScale[i][0].slice(0,-1) == midiNotesReference[pos3][0].slice(0,-1))){

                if(col==13){
                    return "black";
                }else{
                    return lineColor;
                }
            }
            if((position=="downright")&&(midiNotesScale[i][0].slice(0,-1) == midiNotesReference[pos4][0].slice(0,-1))){
                if(col==13){
                    return "black";
                }else{
                    return lineColor;
                }
            }
        }
    }
    return "black";
}






