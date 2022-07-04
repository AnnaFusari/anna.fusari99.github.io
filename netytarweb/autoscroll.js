var musicBoard = document.getElementById("musicBoard");
var boardInfo = musicBoard.getBoundingClientRect();
var cx = boardInfo["width"]/2;
var cy = boardInfo["height"]/2;
var mouseX = 0;
var mouseY = 0;

var autoscrollSet =  document.getElementById("autoscroll");;


function getMousePos(ev){
    mouseX = ev.clientX;
    mouseY = ev.clientY;
    console.log("X: "+mouseX+"Y:"+mouseY);
}
setInterval(musicBoardScroll, 15);
function musicBoardScroll(){
    if(autoscrollSet.checked == true){
        let f = 0.025;
        musicBoard.scrollLeft += (mouseX-cx)*f;
        musicBoard.scrollTop += (mouseY-cy)*f;
    }
}
