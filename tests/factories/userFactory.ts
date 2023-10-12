import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import prisma from '../../src/database';
import { faker } from '@faker-js/faker';


export async function createUser(){
    const user = await prisma.user.create({
        data: {
            email: 'email@exemplo.com',
            password: '1234567890',
        }
    });
    return user;
}

