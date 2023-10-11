import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from 'middlewares/authentication-middleware';
import { credentialService } from '../services/credentialService';

async function createCredential(req: AuthenticatedRequest, res: Response) {
  console.log('Token:', req.header('Authorization')); 
  console.log('UserId:', req.userId); 

  const { userId } = req;

  const credential = await credentialService.createCredential({
    ...req.body,
    userId,
  });

  return res.status(httpStatus.CREATED).send(credential);
}


async function getCredentials(req: Request, res: Response) {
  const credentials = await credentialService.getCredentials();
  return res.status(httpStatus.OK).send(credentials);
}

async function getCredentialById(req: Request, res: Response) {
  const { id } = req.params;
  const credential = await credentialService.getCredentialById(Number(id));
  return res.status(httpStatus.OK).send(credential);
}

async function deleteCredential(req: Request, res: Response) {
  const { id } = req.params;
  await credentialService.deleteCredential(Number(id));
  return res.sendStatus(httpStatus.NO_CONTENT);
}

export const credentialController = {
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
};
