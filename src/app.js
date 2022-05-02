navigator.geolocation.getCurrentPosition(success, error, options);

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGR5LW1hcGJveCIsImEiOiJjbDJveXprZG4xbTA2M2NteGY4OXNnNTJ6In0.-IBL7wFEXMI17Q3PLkw98Q';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [crd.longitude, crd.latitude], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });

  const marker1 = new mapboxgl.Marker()
    .setLngLat([crd.longitude, crd.latitude])
    .addTo(map);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


