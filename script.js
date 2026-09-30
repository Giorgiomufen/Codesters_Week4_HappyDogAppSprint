// Task 2: walker information as a JSON array

const walkers = [
  {
    image_url: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Liisa Tamm',
  },
  {
    image_url: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Mihkel Saar',
  },
  {
    image_url: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Laura Mägi',
  },
  {
    image_url: 'https://randomuser.me/api/portraits/men/64.jpg',
    name: 'Karl Kask',
  },
  {
    image_url: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Mari-Liis Õun',
  }
];

// Read the array and show every walker in the console
walkers.forEach((walker) => {
  console.log(walker.name, walker.image_url);
});
