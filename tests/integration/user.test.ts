import app from "../../src/app";
import prisma from "../../src/database";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";

beforeEach(async () => {
    await prisma.user.deleteMany();
});

const server = supertest(app);

describe('POST /register', () => {
    describe('/register', () => {
        it('should respond with status 400 if email and/or password is empty ', async () => {
            const response = await server.post('/register');
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 400 if password has less then 10 characters ', async () => {
            const response = await server.post('/register').send({
                email: 'exemplo@email.com',
                password: '123456789',
            });
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 409 when email already exists', async () => {
            const user = await createUser();
            await server.post('/register').send({data: user});
            const response = await server.post('/register').send({data: user});
            expect(response.status).toBe(httpStatus.CONFLICT);
        });

        it('should respond with status 201 if user is created sucessfully', async () => {
            const user = await createUser();
            const response = await server.post('/register').send({data: user});
            expect(response.status).toBe(httpStatus.CREATED);
        });
    });
    
    describe('/login', () => {
        it('should respond with status 400 if email and/or password is empty ', async () => {
            const response = await server.post('/login');
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    
        it('should respond with status 404 if user email does not exist', async () => {
            const user = await createUser();
            const response = await server.post('/login').send({data: user});
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });
    
        it('should respond with status 401 if password does not match user register', async () => {
            const user = await createUser();
            const response = await server.post('/login').send({email: user.email, password: '123456789'});
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });
    
        it('should respond with status 200 if login is sucessful', async () => {
            const user = await createUser();
            await server.post('/register').send({data: user});
            const response = await server.post('/login').send({data: user});
            expect(response.status).toBe(httpStatus.OK);
        });
    });
    
});
