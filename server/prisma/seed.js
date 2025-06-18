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
  });

  for (let i = 0; i < 9; i++) {
    users.push({
      id: uuidv4(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password123', 10),
      role: 'user',
    });
  }

  return users;
};

const generateListings = (users, count = 20) => {
  return Array.from({ length: count }).map(() => {
    const host = faker.helpers.arrayElement(users);
    return {
      id: uuidv4(),
      title: faker.lorem.sentence(4),
      description: faker.lorem.paragraph(),
      price: faker.number.int({ min: 50, max: 500 }),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      imageUrls: [faker.image.url(), faker.image.url(), faker.image.url()],
      latitude: parseFloat(faker.location.latitude()),
      longitude: parseFloat(faker.location.longitude()),
      hostId: host.id,
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
