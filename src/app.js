navigator.geolocation.getCurrentPosition(success, error, options);

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var userLongitude = pos.coords.longitude;
  var userLatitude = pos.coords.latitude;
  console.log(userLatitude, userLongitude);
  displayMap(userLatitude, userLongitude);
}

function error(err) {
  alert(`ERROR(${err.code}): ${err.message}`);
}


function displayMap(lat, long) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGR5LW1hcGJveCIsImEiOiJjbDJveXprZG4xbTA2M2NteGY4OXNnNTJ6In0.-IBL7wFEXMI17Q3PLkw98Q';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [long, lat], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });

  const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
    .setLngLat([long, lat])
    .addTo(map);
}