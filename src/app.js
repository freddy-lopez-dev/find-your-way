var userLongitude = '';
var userLatitude = '';

navigator.geolocation.getCurrentPosition(success, error, options);


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  userLongitude = pos.coords.longitude;
  userLatitude = pos.coords.latitude;
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

const getPOI = async (search, lat, long) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=${long}%2C${lat}&types=poi&access_token=pk.eyJ1IjoiZnJlZGR5LW1hcGJveCIsImEiOiJjbDJveXprZG4xbTA2M2NteGY4OXNnNTJ6In0.-IBL7wFEXMI17Q3PLkw98Q`
  const request = await fetch(url);
  const response = await request.json();
  return response.features
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.querySelector('input').value
  getPOI(search, userLatitude, userLongitude)
  .then(data => console.log(data))
});