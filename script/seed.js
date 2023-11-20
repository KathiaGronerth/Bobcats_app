const {
  db,
  models: { User, Car, Ride, Driver },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");
  // Users
  const users = await Promise.all([
    User.create({
      fullName: "Kathia Villavicencio",
      email: "ukw3@txstate.edu",
      username: "kathia",
      password: "123",
    }),
    User.create({
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      username: "janesmith",
      password: "password123",
    }),
    // ...add more users as needed
  ]);

  // Cars
  const cars = await Promise.all([
    Car.create({
      make: "Toyota",
      model: "Corolla",
      year: 2020,
    }),
    Car.create({
      make: "Ford",
      model: "Focus",
      year: 2019,
    }),
    // ...add more cars as needed
  ]);

  // Rides
  const rides = await Promise.all([
    Ride.create({
      source: "Downtown",
      destination: "Airport",
      date: new Date(),
      seats: 3,
      pricePerSeat: 15.0,
    }),
    Ride.create({
      source: "University",
      destination: "Central Park",
      date: new Date(),
      seats: 2,
      pricePerSeat: 10.0,
    }),
    // ...add more rides as needed
  ]);

  // Drivers
  const drivers = await Promise.all([
    Driver.create({
      name: "Alice Johnson",
      vehicle: "Honda Civic - 2018 - Blue",
      license: "ABC123",
    }),
    Driver.create({
      name: "Bob Brown",
      vehicle: "Hyundai Sonata - 2020 - Black",
      license: "XYZ789",
    }),
    // ...add more drivers as needed
  ]);

  console.log(
    `Seeded ${users.length} users, ${cars.length} cars, ${rides.length} rides, and ${drivers.length} drivers.`
  );
  console.log(`seeded successfully`);
}

module.exports = seed;
