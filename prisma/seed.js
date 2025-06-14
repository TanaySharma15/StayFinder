const { PrismaClient } = require("../generated/prisma")
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alice Tester',
            email: 'alice@example.com',
            password: 'test123', // In real app, hash it
        },
    });

    const host = await prisma.user.create({
        data: {
            name: 'Bob Host',
            email: 'bob@example.com',
            password: 'host123',
        },
    });

    const listing = await prisma.listing.create({
        data: {
            title: 'Cozy Cabin in the Woods',
            description: 'A peaceful place to stay near nature.',
            price: 100,
            address: '789 Forest Rd',
            city: 'Asheville',
            state: 'NC',
            country: 'USA',
            imageUrls: ['https://example.com/cabin.jpg'],
            latitude: 35.5951,
            longitude: -82.5515,
            hostId: host.id,
        },
    });

    await prisma.booking.create({
        data: {
            dateFrom: new Date('2025-08-01'),
            dateTo: new Date('2025-08-05'),
            guests: 2,
            userId: user.id,
            listingId: listing.id,
        },
    });

    console.log('✅ Seed data inserted');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
