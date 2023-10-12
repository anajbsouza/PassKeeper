import { credentialController } from '../controllers/credentialController';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validation-middleware';

import { credentialSchema } from '../schemas/credentialSchema';
import { authenticateToken } from '../middlewares/authentication-middleware';

const credentialRouter = Router();

credentialRouter.post('/credentials', authenticateToken, validateSchema(credentialSchema), credentialController.createCredential);
credentialRouter.get('/credentials', authenticateToken, credentialController.getCredentials);
credentialRouter.get('/credentials/:id', authenticateToken, credentialController.getCredentialById);
credentialRouter.delete('/credentials/:id', authenticateToken, credentialController.deleteCredential);

export default credentialRouter;
