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

async function getPOI(search, lat, long) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=${long}%2C${lat}&types=poi&access_token=pk.eyJ1IjoiZnJlZGR5LW1hcGJveCIsImEiOiJjbDJveXprZG4xbTA2M2NteGY4OXNnNTJ6In0.-IBL7wFEXMI17Q3PLkw98Q`
  const request = await fetch(url);
  const response = await request.json();
  return response.features
}

function generatePOI(data) {
  const POIEl = document.querySelector('.points-of-interest');
  POIEl.textContent = '';

  data.forEach(data => {
    const distance = calcDistanceBetweenGeoPts(data.center[1], data.center[0]).toFixed(1)
    POIEl.insertAdjacentHTML(
      'beforeend',
      `
      <li class="poi" data-long="${data.center[0]}" data-lat="${data.center[1]}">
        <ul>
          <li class="name">${data.text}
          </li>
          <li class="street-address">${data.place_name}
          </li>
          <li class="distance">${distance}KM
          </li>
        </ul>
      </li>
      `
    )
  })
}

function calcDistanceBetweenGeoPts(lat1, lon1, lat2 = userLatitude, lon2 = userLongitude, unit = 'K') {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.querySelector('input').value
  getPOI(search, userLatitude, userLongitude)
    .then(data => generatePOI(data))
});

document.querySelector('.points-of-interest').addEventListener('click', (e) => {
  const poiLong = e.target.closest('.poi').dataset.long
  const poiLat = e.target.closest('.poi').dataset.lat
  displayMap(poiLat, poiLong)
})

//Navigation - matrix on mapbox for driving distance or walking distance