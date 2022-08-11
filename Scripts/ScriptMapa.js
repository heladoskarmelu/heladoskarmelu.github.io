var mapa;
var marker;

var geoLoc;
var watchID;

var directionsDisplay;
var directionsService;

var LatLng;

//Función que enciende el mapa
function initMap() { 
  LatLng = {lat: 9.978647495621113, lng: -84.37930856790187}; //Objeto Coordenadas de la Cateferia

  //Creamos el mapa que recibe del HTML y un objeto con el zoom y coordenadas
  mapa = new google.maps.Map( document.getElementById("map"), {center: LatLng, zoom: 17} );

  //Creamos un marcador en el mapa
  marker = new google.maps.Marker({
    position: LatLng,
    map: mapa,
    title: "La Cafetería",
    icon: "../images/markerMap.png"
  });

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
    destination: {lat: 9.978647495621113, lng: -84.37930856790187},
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
  alert("Ocurrió un error: " + err.code);
}