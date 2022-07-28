// Script Básico de la documentación Oficial

// Variables Globales
var mapa;
var marker;

//Geolocation
var watchID;
var geoLoc;

//Función que enciende el mapa
function initMap() { 
  var LatLng = {lat: 9.9763021, lng: -84.3799529}; //Objeto Coordenadas de la UTN

  //Creamos el mapa que recibe del HTML y un objeto con el zoom y coordenadas
  mapa = new google.maps.Map( document.getElementById("map"), {center: LatLng, zoom: 17} );

  marker = new google.maps.Marker({
    position: LatLng,
    map: mapa,
    title: "UTN"
  });
  // getLocation();
}

//Función que obtiene la localización actual del usuario con el objeto Geolocation
function getLocation() {
  if (navigator.geolocation) {
    geoLoc = navigator.geolocation;
    watchID = geoLoc.watchPosition(showLocationOnMap, errorHandler, {enableHighAccuracy: true,});
  } else {
    alert("Error: No soporta Geolocation");
  }
}


//Función que muestra la localización actual del usuario en el mapa
function showLocationOnMap(position) {
  var latitud = position.coords.latitude;
  var longitud = position.coords.longitude;
  console.log("Latitud: " + latitud + " Longitud: " + longitud);

  var myLatLng = {lat: latitud, lng: longitud};
  marker.setPosition(myLatLng);
  mapa.setCenter(myLatLng);
}

//Función que muestra un error en caso de que no se pueda obtener la localización
function errorHandler(err) {
  if(err.code == 1) {
    alert("Error: Acceso denegado");
  } else if(err.code == 2) {
    alert("Error: Posición no disponible");
  }
}