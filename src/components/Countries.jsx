export const countries = [
  "Seychelles",
  "Romania",
  "Turkey",
  "Austria",
  "Chile",
  "Saint Maarten",
  "Montserrat",
  "Liberia",
  "Cook Islands",
];

export const addresses = [
  {
    address: "Luis-Gassner-Ring 3",
    city: "Knittelfeld",
    zip: "8380",
  },
  {
    address: "Lindgren Amble 93",
    city: "Quigleyberg",
    zip: "2690",
  },
  {
    address: "Altenwerth Knolls Apt. 511",
    city: "Beahanfort",
    zip: "35715-4955",
  },
  {
    address: "Emmitt Quay 3 Orn Parade",
    city: "Arlieston",
    zip: "1558",
  },
  {
    address: "Rúa Javier, 71",
    city: "Las Paz",
    zip: "25956",
  },
];

export const venueNames = "Best Venue";

export const getCountries = () => {
  return countries[Math.floor(Math.random() * countries.length)];
};

export const getAddress = () => {
  return addresses[Math.floor(Math.random() * addresses.length)];
};
