import app from "../../src/app";
import prisma from "../../src/database";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { createCredential } from "../factories/credentialFactory";
import { User } from "@prisma/client";
import { createUser } from "services/userService";
import * as jwt from 'jsonwebtoken';

beforeEach(async () => {
    await prisma.credential.deleteMany({});
});

export async function generateValidToken(user?: User) {
    const userId = user?.id || 1; 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    return token;
}

const server = supertest(app);

describe('Credentials', () => {
    describe('POST /credentials', () => {
        it('should respond with 400 if any of the credential camps are empty', async () => {
            const token = await generateValidToken();
            const emptyCredential = {
                title: '',
                url: '',
                username: '',
                password: '',
            };
            const response = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(emptyCredential);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with 400 if title already exists', async () => {
            const token = await generateValidToken();
            const credential1 = {
                title: 'Titulo',
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(credential1);
            
            const credential2 = {
                title: 'Titulo',
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            const response = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(credential2);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with 201 when credential is created', async () => {
            //const token = await generateValidToken();
            const credential = {
                title: faker.lorem.word(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            const response = await server
                .post('/credentials')
                // .set('Authorization', `Bearer ${token}`)
                .send(credential);

            expect(response.status).toBe(httpStatus.CREATED);
        });
    });
    describe('GET /credentials', () => {

        it('should respond with status 401 if no token is given', async () => {
            const response = await server.get('/credentials');
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it('should respond with status 200 if can get user credentials', async () => {
            const token = await generateValidToken();
            const credential = {
                title: faker.lorem.word(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(credential);
            
                const response = await server
            .get('/credentials')
            .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK);
        });

    });
    
    describe('GET /credential/:id', () => {

        it('should responde with status 200 when getting credential sucessfully', async () => {
            const user = {
                email: faker.internet.email(),
                password: faker.internet.password(),
            }
            await server.post('/users').send({email: user.email, password: user.password});
            const createdUser = await prisma.user.findFirst({where: {email: user.email}});
            const token = await generateValidToken(createdUser);
            const credential = {
                title: faker.lorem.word(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            const createdCredential = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(credential);

            const response = await server
                .get(`/credentials/${createdCredential.body.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK);
        });

        it('', async () => {
            
        });

        it('', async () => {
            
        });

        it('', async () => {
            
        });
    });

    describe('DELETE /credentials/:id', () => {

        it('', async () => {
            
        });

        it('', async () => {
            
        });

        it('', async () => {
            
        });

        it('', async () => {
            
        });
    });
});