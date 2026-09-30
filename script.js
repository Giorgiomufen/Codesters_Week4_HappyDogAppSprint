// Task 2: walker information as a JSON array

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

// Log each walker's name by looping through the array
walkers.forEach((walker) => {
  console.log(walker.name);
});
