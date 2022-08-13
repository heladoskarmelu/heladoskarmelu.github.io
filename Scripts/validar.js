// // creamos la funcion
function validarFormulario() {
    // removemos el div con la clase alert

    $('.alert').remove();
    // declarion de variables
    var nombre = $('#nombre').val(),
        correo = $('#correo').val(),
        asunto = $('#asunto').val(),
        mensaje = $('#mensaje').val();
    fechaNacimiento = $('#fechaNacimiento').val();
    rango = $('#customRange1').val();

    // validamos el campo nombre
    if (nombre == "" || nombre == null) {

        cambiarColor("nombre");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    } else {
        var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
        if (!expresion.test(nombre)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("nombre");
            mostraAlerta("No se permiten carateres especiales o numeros");
            return false;
        }
    }

    // validamos el correo
    if (correo == "" || correo == null) {

        cambiarColor("correo");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    } else {
        var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (!expresion.test(correo)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("correo");
            mostraAlerta("Por favor ingrese un correo válido");
            return false;
        }

    }

    //validamos fecha
    if (fechaNacimiento == "" || fechaNacimiento == null) {

        cambiarColor("fechaNacimiento");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    }

    //validamos genero
    if (!$('input[name="genero"]').is(':checked')) {
        cambiarColor("generos");
        mostraAlerta("Por favor seleccione el género");
        return false;
    }

    // validamos el asunto
    if (asunto == "" || asunto == null) {

        cambiarColor("asunto");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    } else {
        var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if (!expresion.test(asunto)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("asunto");
            mostraAlerta("No se permiten caracteres especiales");
            return false;
        }
    }

    // validamos el mensaje
    if (mensaje == "" || mensaje == null) {

        cambiarColor("mensaje");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    } else {
        var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if (!expresion.test(mensaje)) {
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("mensaje");
            mostraAlerta("No se permiten caracteres especiales");
            return false;
        }
    }
    enviar();
    //  $('form').submit();
    alert("Correo envíado existosamente");
    LimpiarCampos();

    return true;


}



function LimpiarCampos() {
    $('input[type="text"]').val('');
    $('input[type="date"]').val('');
    $('input[type="email"]').val('');
    $('input[type="range"]').val('');
    $('input[type="range"]').val('');
    $('#mensaje').val('');
    $('input[name="genero"]').prop('checked', false);
    $('input[type=checkbox]').prop('checked', false);
}


$('input').focus(function () {
    $('.alert').remove();
    colorDefault('nombre');
    colorDefault('correo');
    colorDefault('asunto');
});

$('textarea').focus(function () {
    $('.alert').remove();
    colorDefault('mensaje');
});

// creamos un funcion de color por defecto a los bordes de los inputs
function colorDefault(dato) {
    $('#' + dato).css({
        border: "1px solid #999"
    });
}

// creamos una funcio para cambiar de color a su bordes de los input
function cambiarColor(dato) {
    $('#' + dato).css({
        border: "1px solid #dd5144"
    });
}

// funcion para mostrar la alerta

function mostraAlerta(texto) {
    $('#enviar').after('<div style="color: red" class="alert"><i style="color: red" class="fa-solid fa-circle-exclamation"></i> Error: ' + texto + '</div>');
    //  output.innerHTML =
    //     "<div style='color: red'><i class='fas fa-exclamation-triangle'></i> No se pudo calcular la distancia.</div>";

}

function enviar() {
    var nombre = document.getElementsByName("nombre")[0].value;
    var correo = document.getElementsByName("correo")[0].value;
    var rango = document.getElementsByName("rango")[0].value;
    var genero = document.getElementsByName("genero")[0].value;
    // var bachillerato = document.getElementsByName("Bachillerato")[0].value;
    // var diplomado = document.getElementsByName("Diplomado")[0].value;
    // var  licenciatura= document.getElementsByName("Licenciatura")[0].value;
    var asunto = document.getElementsByName("asunto")[0].value;
    var mensaje = document.getElementsByName("mensaje")[0].value;
    var dtpFechaNacimiento = document.getElementsByName("fechaNacimiento")[0].value;
    fechaNacimiento = new Date(dtpFechaNacimiento);
    var getFecha = new Date();
    var edad = getFecha.getFullYear() - fechaNacimiento.getFullYear();

    // https://github.com/github/fetch
    fetch("https://formsubmit.co/ajax/lusuarezag@est.utn.ac.cr", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Nombre: nombre,
            Email: correo,
            Nacimiento: fechaNacimiento,
            Edad: edad,
            Calificacion: rango,
            Genero: genero,
            // bachillerato: bachillerato,
            // licenciatura: licenciatura,
            // diplomado: diplomado,
            Asunto: asunto,
            Mensaje: mensaje
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        // .then(window.location.href = "../index.html")
        .catch(error => console.log(error));

}