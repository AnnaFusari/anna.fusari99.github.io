window.addEventListener("DOMContentLoaded", function(){
    reloadBoard();
})

function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("openNav").style.display = "none";

    document.getElementById("closeNav").style.display = "block";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("openNav").style.display = "block";

    document.getElementById("closeNav").style.display = "none";
}
