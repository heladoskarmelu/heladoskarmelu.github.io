var mapa;

var geoLoc;
var watchID;

var directionsDisplay;
var directionsService;

//Función que enciende el mapa
function initMap() { 
  var LatLng = {lat: 9.9763021, lng: -84.3799529}; //Objeto Coordenadas de la UTN

  //Creamos el mapa que recibe del HTML y un objeto con el zoom y coordenadas
  mapa = new google.maps.Map( document.getElementById("map"), {center: LatLng, zoom: 17} );

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  directionsDisplay.setMap(mapa);
}





function botonCalcularRuta() {
  if (navigator.geolocation) {
    geoLoc = navigator.geolocation;
    watchID = geoLoc.watchPosition(calcRoute, errorHandler, {enableHighAccuracy: true,});
  } else {
    alert("Error: El navegador no soporta Geolocation");
  }
}



function calcRoute(position) {
  var request = {
    origin: {lat: position.coords.latitude, lng: position.coords.longitude},
    destination: {lat: 9.9763021, lng: -84.3799529},
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.METRIC
  }

  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        //Enseña la ruta
        directionsDisplay.setDirections(result);
    } else {
        //Se borra la ruta
        directionsDisplay.setDirections({ routes: [] });

        //Mensaje de error
        alert("Hubo un problema con la solicitud de ruta. Error: " + status);
    }
});

}

function errorHandler(err) {
  alert("Se despichó tere");
}