import app from "../../src/app";
import prisma from "../../src/database";
import httpStatus from "http-status";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { createUser } from "../factories/userFactory";
import * as jwt from 'jsonwebtoken';

beforeEach(async () => {
    await prisma.credential.deleteMany({});
    await prisma.user.deleteMany({});
});

export async function generateValidToken(user?: User) {
    console.log("user valid token", user)
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
            const user = {
                email: 'email@email.com',
                password: '1234567890'
            }
            
            const userResponse = await server.post('/register').send({email: user.email, password: user.password});
            await server.post('/login').send({email: user.email, password: user.password});
            const token = await generateValidToken(userResponse.body);

            const credential = {
                title: 'Titulo Igual',
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(credential);

            const response = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
                .send(credential);

                console.log("response", response.body)
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with 201 when credential is created', async () => {
            const user = {
                email: 'certo@email.com',
                password: faker.internet.password({length: 10}),
            }
            const userResponse = await server.post('/register').send({email: user.email, password: user.password});
            await server.post('/login').send({email: user.email, password: user.password});
            const token = await generateValidToken(userResponse.body);

            const credential = {
                title: faker.lorem.word(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            const response = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token}`)
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
            const user = {
                email: 'certo@email.com',
                password: faker.internet.password({length: 10}),
            }
            const userResponse = await server.post('/register').send({email: user.email, password: user.password});
            await server.post('/login').send({email: user.email, password: user.password});
            const token = await generateValidToken(userResponse.body);

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
                email: 'certo@email.com',
                password: faker.internet.password({length: 10}),
            }
            const userResponse = await server.post('/register').send({email: user.email, password: user.password});
            await server.post('/login').send({email: user.email, password: user.password});
            const token = await generateValidToken(userResponse.body);
            
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

        it('should respond with status 401 when user does not own the credential', async () => {
            const user1 = {
                email: 'user1@email.com',
                password: faker.internet.password({ length: 10 }),
            };
            const user1Response = await server.post('/register').send(user1);
            await server.post('/login').send(user1);

            const user2 = {
                email: 'user2@email.com',
                password: faker.internet.password({ length: 10 }),
            };
            const user2Response = await server.post('/register').send(user2);
            await server.post('/login').send(user2);

            const token1 = await generateValidToken(user1Response.body);
            const credential = {
                title: faker.lorem.word(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };
            const createdCredential = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token1}`)
                .send(credential);

            const token2 = await generateValidToken(user2Response.body);
            const response = await server
                .get(`/credentials/${createdCredential.body.id}`)
                .set('Authorization', `Bearer ${token2}`);

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
        
    });

    describe('DELETE /credentials/:id', () => {

        it('should responde with status 204 when deleting credential sucessfully', async () => {
            const user = {
                email: 'certo@email.com',
                password: faker.internet.password({length: 10}),
            }
            const userResponse = await server.post('/register').send({email: user.email, password: user.password});
            await server.post('/login').send({email: user.email, password: user.password});
            const token = await generateValidToken(userResponse.body);

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
                .delete(`/credentials/${createdCredential.body.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.NO_CONTENT);
        });

        it('should respond with status 401 when user does not own the credential', async () => {
            const user1 = {
                email: 'user1@email.com',
                password: faker.internet.password({ length: 10 }),
            };
            const user1Response = await server.post('/register').send(user1);
            await server.post('/login').send(user1);

            const token1 = await generateValidToken(user1Response.body);
            const credential = {
                title: faker.lorem.word(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            };

            const createdCredential = await server
                .post('/credentials')
                .set('Authorization', `Bearer ${token1}`)
                .send(credential);

            const user2 = {
                email: 'user2@email.com',
                password: faker.internet.password({ length: 10 }),
            };
            const user2Response = await server.post('/register').send(user2);
            await server.post('/login').send(user2);
            
            
            const token2 = await generateValidToken(user2Response.body);
            const response = await server
                .delete(`/credentials/${createdCredential.body.id}`)
                .set('Authorization', `Bearer ${token2}`);

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
    });
});