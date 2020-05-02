async function getISSPosition() {
  await fetch(`http://api.open-notify.org/iss-now.json`)
    .then((response) => {
      response.json().then((data) => {
        lat = data.iss_position.latitude;
        lng = data.iss_position.longitude;
      });
    })
    .catch((error) => console.log(error));
}

function setMap() {
  getISSPosition();
  if (lat && lng) {
    if (lockView) {
      map.setView(new L.LatLng(lat, lng));
    }
    marker.setLatLng(new L.LatLng(lat, lng));
  }
}

// Function for adding a custom control with a custom callback on click
function addCustomControl(title, iconSvg, callback) {
  L.Control.lockControl = L.Control.extend({
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-control-custom');
      container.setAttribute('title', title);
      var icon = L.DomUtil.create('div', 'control-icon');
      icon.innerHTML = iconSvg;
      container.appendChild(icon);
      L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation)
        .on(container, 'click', L.DomEvent.stop)
        .on(container, 'click', this._toggleControl, this);
      return container;
    },
    _toggleControl: function (e) {
      e.preventDefault();
      callback(e);
    }
  });
  return (new L.Control.lockControl({ position: 'topright' })).addTo(map);
}

let lat = null;
let lng = null;

let lockView = true;

var ISSIcon = L.icon({
  iconUrl: "assets/icon/iss.png",
  iconSize: [75, 75],
});

var map = L.map("map").setView([0, 0], 4);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; " + mapLink + " Contributors",
  maxZoom: 8,
  minZoom: 3,
}).addTo(map);

var marker = L.marker([0, 0], {
  icon: ISSIcon,
  title: "Click to know about me.",
})
  .addTo(map)
  .bindPopup(
    "<p>Hi there 🙂 <br> \
    I am <b>International Space Station</b> often called <b>ISS</b>.\
    I orbit around the Earth at about <b>400 km</b> above the ground. \
    I weigh approximately <b>420,000 kilogram</b>.\
    I am <b>73 meters</b> long and <b>109 meters</b> wide.\
    I function on more than <b>2.3 million</b> lines of code.</p>"
  );

// Adding custom control for locking/unlocking map view to the satellite
const lockIcon = '<svg class="svg-icon" viewBox="0 0 20 20"> <path d="M17.659,9.597h-1.224c-0.199-3.235-2.797-5.833-6.032-6.033V2.341c0-0.222-0.182-0.403-0.403-0.403S9.597,2.119,9.597,2.341v1.223c-3.235,0.2-5.833,2.798-6.033,6.033H2.341c-0.222,0-0.403,0.182-0.403,0.403s0.182,0.403,0.403,0.403h1.223c0.2,3.235,2.798,5.833,6.033,6.032v1.224c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403v-1.224c3.235-0.199,5.833-2.797,6.032-6.032h1.224c0.222,0,0.403-0.182,0.403-0.403S17.881,9.597,17.659,9.597 M14.435,10.403h1.193c-0.198,2.791-2.434,5.026-5.225,5.225v-1.193c0-0.222-0.182-0.403-0.403-0.403s-0.403,0.182-0.403,0.403v1.193c-2.792-0.198-5.027-2.434-5.224-5.225h1.193c0.222,0,0.403-0.182,0.403-0.403S5.787,9.597,5.565,9.597H4.373C4.57,6.805,6.805,4.57,9.597,4.373v1.193c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403V4.373c2.791,0.197,5.026,2.433,5.225,5.224h-1.193c-0.222,0-0.403,0.182-0.403,0.403S14.213,10.403,14.435,10.403"></path> </svg>';

addCustomControl('Lock/Unlock View', lockIcon, function (e) {
  lockView = !lockView;
});

setMap();

setInterval(setMap, 1000);

