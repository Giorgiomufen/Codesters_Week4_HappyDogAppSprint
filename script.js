// Walker information as a JSON array

const walkers = [
  {
    "id": 1,
    "image_url": "https://randomuser.me/api/portraits/women/44.jpg",
    "name": "Liisa Tamm",
    "rating": 5,
    "hour_rate": 12.50,
    "availability": "Monday to Friday, 09:00 - 17:00",
    "description": "Liisa is a passionate dog lover with 5 years of experience walking dogs of all sizes. She enjoys long walks in the park and ensures each dog gets the attention they need.",
    "location": {
      "latitude": 59.4370,
      "longitude": 24.7536
    }
  },
  {
    "id": 2,
    "image_url": "https://randomuser.me/api/portraits/men/45.jpg",
    "name": "Mihkel Saar",
    "rating": 4,
    "hour_rate": 10.00,
    "availability": "Saturday and Sunday, 10:00 - 16:00",
    "description": "Mihkel is an active outdoorsman who loves spending weekends walking dogs. He has experience with high-energy breeds and loves playing fetch with them.",
    "location": {
      "latitude": 59.4270,
      "longitude": 24.7194
    }
  },
  {
    "id": 3,
    "image_url": "https://randomuser.me/api/portraits/women/65.jpg",
    "name": "Laura Mägi",
    "rating": 4,
    "hour_rate": 15.00,
    "availability": "Monday, Wednesday, Friday, 08:00 - 12:00",
    "description": "Laura is a veterinary student who takes great care in understanding the unique needs of every dog. She's great with elderly dogs and those with special needs.",
    "location": {
      "latitude": 59.4489,
      "longitude": 24.7535
    }
  },
  {
    "id": 4,
    "image_url": "https://randomuser.me/api/portraits/men/64.jpg",
    "name": "Karl Kask",
    "rating": 3,
    "hour_rate": 8.75,
    "availability": "Tuesday and Thursday, 18:00 - 21:00",
    "description": "Karl is a university student who enjoys walking dogs in his free time. He is energetic and good with younger dogs who need extra playtime.",
    "location": {
      "latitude": 59.4402,
      "longitude": 24.7795
    }
  },
  {
    "id": 5,
    "image_url": "https://randomuser.me/api/portraits/women/12.jpg",
    "name": "Mari-Liis Õun",
    "rating": 5,
    "hour_rate": 20.00,
    "availability": "Every day, 07:00 - 15:00",
    "description": "Mari-Liis is an experienced dog walker and trainer. She has worked with dogs for over 10 years and specializes in training basic obedience during walks.",
    "location": {
      "latitude": 59.4323,
      "longitude": 24.7453
    }
  }
];

// Log each walker's name
walkers.forEach((walker) => {
  console.log(walker.name);
});

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

displayWalkers();
