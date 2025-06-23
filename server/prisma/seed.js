import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

const generateUsers = async () => {
  const users = [];

  users.push({
    id: uuidv4(),
    name: 'Admin User',
    email: 'admin@stayfinder.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    location: faker.location.city(),
    avatar: "https://imgs.search.brave.com/aL29LMhWj5_z_9Vco_3SEQtfYuOaOPeZhqg2o-seml4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzE4LzMxLzI5/LzM2MF9GXzE1MTgz/MTI5MzNfMXc0NzRN/UlY5MENiNDFGNWZ1/QUN2U3NJUEh2b1d2/QmMuanBn"
  });

  for (let i = 0; i < 9; i++) {
    users.push({
      id: uuidv4(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password123', 10),
      role: 'user',
      location: faker.location.city(),
      avatar: "https://imgs.search.brave.com/aL29LMhWj5_z_9Vco_3SEQtfYuOaOPeZhqg2o-seml4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzE4LzMxLzI5/LzM2MF9GXzE1MTgz/MTI5MzNfMXc0NzRN/UlY5MENiNDFGNWZ1/QUN2U3NJUEh2b1d2/QmMuanBn"
    });
  }

  return users;
};

const sampleAmenities = [
  "Wifi",
  "Kitchen",
  "Air conditioning",
  "Washer",
  "Dryer",
  "Iron",
  "Hair dryer",
  "Dedicated workspace",
  "TV",
  "Heating",
];

const sampleRules = [
  "Check-in: 3:00 PM - 11:00 PM",
  "Checkout: 11:00 AM",
  "No smoking",
  "No pets",
  "No parties or events",
];

const generateListings = (users, count = 20) => {
  return Array.from({ length: count }).map(() => {
    const host = faker.helpers.arrayElement(users);
    return {
      id: uuidv4(),
      title: faker.lorem.sentence(4),
      description: faker.lorem.paragraph({ min: 30, max: 150 }),
      price: faker.number.int({ min: 50, max: 500 }),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      imageUrls: ["https://imgs.search.brave.com/G2Wy4qucuwUtD4rWDU1EpaXJ4wXKr0wT2gGvGyKU2fw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc2ltcGxvdGVs/LmNvbS9zaW1wbG90/ZWwvaW1hZ2UvdXBs/b2FkL3dfNTAwMCxo/XzI1MjUveF81OTMs/eV8yODYsd180Mjgw/LGhfMTY2NSxyXzAs/Y19jcm9wLHFfODAs/ZmxfcHJvZ3Jlc3Np/dmUvd18xNjUwLGNf/Zml0LGZfYXV0by9z/LWhvdGVsLW1vbnRl/Z28tYmF5L1NfSG90/ZWxfTG9iYnlfaHY4/djQy.jpeg", "https://imgs.search.brave.com/UH3cPWllAbmlc-TuPhN_sxH4PIYOUgJaVxOvKFG8AvE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ob3RlbF82NjQ0/MzQtMzY2Ny5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQw", "https://imgs.search.brave.com/CG9TdxuQtTcuI3yUZtepzK8wO-3ii_zImOwvlCZWd_s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LnI5Y2RuLm5l/dC9yaW1nL2hpbWcv/OTkvMzIvMmIvYWdv/ZGEtODU4ODItNjYy/MjExNjUtOTkwMTk0/LmpwZz93aWR0aD0z/MzUmaGVpZ2h0PTI2/OCZjcm9wPXRydWU"],
      latitude: parseFloat(faker.location.latitude()),
      longitude: parseFloat(faker.location.longitude()),
      hostId: host.id,
      amenities: faker.helpers.arrayElements(sampleAmenities, faker.number.int({ min: 3, max: 7 })),
      rules: faker.helpers.arrayElements(sampleRules, faker.number.int({ min: 2, max: 5 })),
    };
  });
};

const generateBookings = (users, listings, count = 15) => {
  return Array.from({ length: count }).map(() => {
    const user = faker.helpers.arrayElement(users);
    const listing = faker.helpers.arrayElement(listings);
    const startDate = faker.date.recent({ days: 30 });
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 2, max: 7 }) * 86400000);
    const cancellation = new Date(startDate.getTime() + 48 * 3600 * 1000);

    return {
      id: uuidv4(),
      dateFrom: startDate,
      dateTo: endDate,
      cancellation: cancellation,
      guests: faker.number.int({ min: 1, max: 6 }),
      userId: user.id,
      listingId: listing.id,
    };
  });
};

const generateFavorites = (users, listings, n = 30) => {
  const uniquePairs = new Set();
  const favorites = [];

  while (favorites.length < n) {
    const user = faker.helpers.arrayElement(users);
    const listing = faker.helpers.arrayElement(listings);
    const key = `${user.id}-${listing.id}`;

    if (!uniquePairs.has(key)) {
      uniquePairs.add(key);
      favorites.push({
        id: uuidv4(),
        userId: user.id,
        listingId: listing.id,
      });
    }
  }

  return favorites;
};

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  const users = await generateUsers();
  const listings = generateListings(users);
  const bookings = generateBookings(users, listings);
  const favorites = generateFavorites(users, listings);

  await prisma.user.createMany({ data: users });
  await prisma.listing.createMany({ data: listings });
  await prisma.booking.createMany({ data: bookings });
  await prisma.favorite.createMany({ data: favorites });

  console.log('✅ Seeded database with users, listings, bookings, and favorites.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
