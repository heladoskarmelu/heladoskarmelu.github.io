// creamos la funcion
function validarFormulario(){
    // removemos el div con la clase alert
    $('.alert').remove();


    // declarion de variables
    var nombre=$('#nombre').val(),
        correo=$('#correo').val(),
        asunto=$('#asunto').val(),
        mensaje=$('#mensaje').val();

    // validamos el campo nombre
    if(nombre=="" || nombre==null){

        cambiarColor("nombre");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    }else{
        var expresion= /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
        if(!expresion.test(nombre)){
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("nombre");
            mostraAlerta("No se permiten carateres especiales o numeros");
            return false;
        }
    }

    // validamos el correo
    if(correo=="" || correo==null){

        cambiarColor("correo");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    }else{
        var expresion= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if(!expresion.test(correo)){
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("correo");
            mostraAlerta("Por favor ingrese un correo válido");
            return false;
        }
    }

    // validamos el asunto
    if(asunto=="" || asunto==null){

        cambiarColor("asunto");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    }else{
        var expresion= /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if(!expresion.test(asunto)){
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("asunto");
            mostraAlerta("No se permiten caracteres especiales");
            return false;
        }
    }

     // validamos el mensaje
     if(mensaje=="" || mensaje==null){

        cambiarColor("mensaje");
        // mostramos le mensaje de alerta
        mostraAlerta("Campo obligatorio");
        return false;
    }else{
        var expresion= /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if(!expresion.test(mensaje)){
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("mensaje");
            mostraAlerta("No se permiten caracteres especiales");
            return false;
        }
    }
    enviar();
    $('form').submit();
    return true;
    

} 

$('input').focus(function(){
    $('.alert').remove();
    colorDefault('nombre');
    colorDefault('correo');
    colorDefault('asunto');
});

$('textarea').focus(function(){
    $('.alert').remove();
    colorDefault('mensaje');
});

// creamos un funcion de color por defecto a los bordes de los inputs
function colorDefault(dato){
    $('#' + dato).css({
        border: "1px solid #999"
    });
}

// creamos una funcio para cambiar de color a su bordes de los input
function cambiarColor(dato){
    $('#' + dato).css({
        border: "1px solid #dd5144"
    });
}

// funcion para mostrar la alerta

function mostraAlerta(texto){
    $('#nombre').before('<div class="alert">Error: '+ texto +'</div>');
}

function enviar(){
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
    var getFecha= new Date();
     var edad = getFecha.getFullYear() - fechaNacimiento.getFullYear();
     
        // https://github.com/github/fetch
fetch("https://formsubmit.co/ajax/ramirezrojasfabio@gmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: nombre,
        email: correo,
        date: fechaNacimiento,
        age: edad,
        range: rango,
        genero: genero,
        // bachillerato: bachillerato,
        // licenciatura: licenciatura,
        // diplomado: diplomado,
        asunto:asunto,
        mensaje:mensaje
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}