import request from 'supertest';
import { app } from '../index.js';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

describe('User Routes', () => {
    let token, user;

    beforeAll(async () => {
        user = await prisma.user.create({
            data: {
                email: 'testuser@example.com',
                password: 'hashed_password_here', // You can mock bcrypt for login tests later
                name: 'Test User',
            },
        });

        token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user.id } });
        await prisma.$disconnect();
    });

    it('Should return user profile when authorized', async () => {
        const res = await request(app)
            .get('/api/user/profile')
            .set('Cookie', [`token=${token}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('id', user.id);
        expect(res.body.data).toHaveProperty('email', user.email);
        expect(res.body.data).toHaveProperty('listings');
        expect(res.body.data).toHaveProperty('bookings');
    });

    it('Should update user name when authorized', async () => {
        const res = await request(app)
            .put('/api/user/profile')
            .send({ name: 'Updated User' })
            .set('Cookie', [`token=${token}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('name', 'Updated User');
    });
});
