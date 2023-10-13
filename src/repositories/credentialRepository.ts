import prisma from "../database";
import { CreateCredential } from "protocols";

async function create(credential: CreateCredential) {
    return prisma.credential.create({
        data: credential,
        select: {
            id: true,
            title: true,
            url: true,
            username: true,
            password: true,
            userId: true
        }
    });
}

async function findByTitle(title: string) {
    return prisma.credential.findFirst({
        where: { title }
    })
}

async function findAll(userId: number) {
    return prisma.credential.findMany({
        where: { userId }
    });
}

async function findById(id: number, userId: number) {
    return prisma.credential.findFirst({
        where: { id, userId }
    })
}

async function deleteCredential(id: number, userId: number) {
    return prisma.credential.delete({
        where: { id, userId }
    })
}

export const credentialRepository = {
    create,
    findByTitle,
    findAll,
    findById,
    deleteCredential
};