function filtroMenu(c) {
    var x = document.getElementById("todo");
    var y = x.querySelectorAll("li");
    // console.log(c);
    // console.log(y);
    var i, c;
    for (i = 0; i < y.length; i++) {
        if (y[i].className == c || c == "all") {
            y[i].style.display = "inline-block";
        } else {
            y[i].style.display = "none";
        }
    }
}

function openGaleria() {
    window.location.href = "./paginas/galeria.html";
}

function openSpots() {
    window.location.href = "./paginas/ubicaciones.html";
}

function openNosotros() {
    window.location.href = "./paginas/Nosotros.html";
}
