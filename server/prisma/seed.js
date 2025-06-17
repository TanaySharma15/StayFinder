import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from "uuid"
const prisma = new PrismaClient();

const generateUsers = (n = 10) => {
  return Array.from({ length: n }).map(() => ({
    id: uuidv4(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'password123',
  }));
};

const generateListings = (users, n = 15) => {
  return Array.from({ length: n }).map(() => {
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
      imageUrls: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
      latitude: parseFloat(faker.location.latitude()),
      longitude: parseFloat(faker.location.longitude()),
      hostId: host.id,
    };
  });
};

const generateBookings = (users, listings, n = 20) => {
  return Array.from({ length: n }).map(() => {
    const user = faker.helpers.arrayElement(users);
    const listing = faker.helpers.arrayElement(listings);
    const startDate = faker.date.past();
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 1, max: 14 }) * 86400000);

    return {
      id: uuidv4(),
      dateFrom: startDate,
      dateTo: endDate,
      guests: faker.number.int({ min: 1, max: 6 }),
      userId: user.id,
      listingId: listing.id,
    };
  });
};

async function main() {
  const users = generateUsers(10);
  const listings = generateListings(users, 20);
  const bookings = generateBookings(users, listings, 25);

  await prisma.booking.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: users });
  await prisma.listing.createMany({ data: listings });
  await prisma.booking.createMany({ data: bookings });

  console.log('🌱 Seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
