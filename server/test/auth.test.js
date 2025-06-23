import request from "supertest"
import { app } from "../index.js"

describe('AuthRoutes', () => {
    it('Should login with correct credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'Tanay@gmail.com',
            password: 'password123'
        });
        expect(res.statusCode).toBe(200)
        // expect(res.body).toHaveProperty('token')
    })
    it('Should fail with wrong credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'TanaySharma@gmail.com',
            password: 'Tanay@123'
        });
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('Invalid email or password')
    })
})