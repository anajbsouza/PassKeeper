import { Credential } from "@prisma/client";

export type ApplicationError = {
    name: string;
    message: string;
};

export type RequestError = {
    status: number;
    data: object | null;
    statusText: string;
    name: string;
    message: string;
};

export type CreateCredential = Omit<Credential, 'id'>;