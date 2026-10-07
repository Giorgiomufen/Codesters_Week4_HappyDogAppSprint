// Task 2: the walkers are loaded from walkers.json further down.
// It starts empty because the file takes a moment to arrive.
let walkers = [];

const walkerList = document.getElementById('walker-list');
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const backButton = document.getElementById('back-button');

let map;
let walkerMarker;
let myMarker;
let myLocation;

// Task 3: show all the walkers as cards
function displayWalkers() {
  walkerList.innerHTML = "";

  const template = document.getElementById('walker-card-template').content;

  walkers.forEach((walker) => {
    const walkerCard = template.cloneNode(true);

    walkerCard.querySelector('.walker-image').src = walker.image_url;
    walkerCard.querySelector('.walker-name').textContent = walker.name;
    walkerCard.querySelector('.walker-rating').textContent = "⭐".repeat(walker.rating);
    walkerCard.querySelector('.walker-availability').textContent = walker.availability;

    // Task 4: open the walker when the card is clicked
    walkerCard.querySelector('.walker-card').addEventListener('click', () => {
      console.log(walker);
      showWalker(walker);
    });

    walkerList.appendChild(walkerCard);
  });
}

// Task 5: fill the detail view and hide the list
function showWalker(walker) {
  document.getElementById('detail-image').src = walker.image_url;
  document.getElementById('detail-name').textContent = walker.name;
  document.getElementById('detail-rating').textContent = "⭐".repeat(walker.rating);
  document.getElementById('detail-availability').textContent = "Available: " + walker.availability;
  document.getElementById('detail-description').textContent = walker.description;

  listView.classList.add('hidden');
  detailView.classList.remove('hidden');

  // Task 10: CountUp.js counts the price up
  const price = new countUp.CountUp('detail-rate', walker.hour_rate, { decimalPlaces: 2 });
  price.reset();
  price.start();

  showMap(walker);
}

// Task 7: map of the walker's location
function showMap(walker) {
  const lat = walker.location.latitude;
  const lng = walker.location.longitude;

  if (!map) {
    map = L.map('map').setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  } else {
    map.setView([lat, lng], 14);
  }

  // without this the tiles stay grey, because the map was hidden
  map.invalidateSize();

  // take the old marker off before adding the new one
  if (walkerMarker) {
    map.removeLayer(walkerMarker);
  }

  // Task 8: marker with a popup that shows the name
  walkerMarker = L.marker([lat, lng]).addTo(map);
  walkerMarker.bindPopup(walker.name);

  // Task 9: our own location, if the browser already gave it to us
  if (myLocation) {
    addMyMarker();
  }
}

// Task 9: marker for where we are
function addMyMarker() {
  if (myMarker) {
    map.removeLayer(myMarker);
  }

  myMarker = L.marker([myLocation.latitude, myLocation.longitude]).addTo(map);
  myMarker.bindPopup("You are here");
}

// Task 6: back to the list
backButton.addEventListener('click', () => {
  detailView.classList.add('hidden');
  listView.classList.remove('hidden');
});

// Task 9: ask the browser where we are
function showPosition(position) {
  myLocation = position.coords;
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  // the location usually arrives after the map is already open
  if (map) {
    addMyMarker();
  }
}

function showError(error) {
  console.log("Could not get your location: " + error.message);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  console.log("Geolocation is not supported by this browser.");
}

// Task 2: load the walkers from walkers.json, then start the app
fetch("walkers.json")
  .then((response) => response.json())
  .then((data) => {
    walkers = data;

    // log each walker's name
    walkers.forEach((walker) => {
      console.log(walker.name);
    });

    displayWalkers();
  });
