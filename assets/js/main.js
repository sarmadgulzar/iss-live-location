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
    map.setView(new L.LatLng(lat, lng));
    marker.setLatLng(new L.LatLng(lat, lng));
  }
  setTimeout(setMap, 3000);
}

let lat = null;
let lng = null;

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

setMap();

