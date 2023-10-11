import { credentialController } from '../controllers/credentialController';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validation-middleware';

import { credentialSchema } from '../schemas/credentialSchema';
import { authenticateToken } from '../middlewares/authentication-middleware';

const credentialRouter = Router();

credentialRouter.post('/credentials', authenticateToken, validateSchema(credentialSchema), credentialController.createCredential);
credentialRouter.get('/credentials', credentialController.getCredentials);
credentialRouter.get('/credentials/:id', credentialController.getCredentialById);
credentialRouter.delete('/credentials/:id', credentialController.deleteCredential);

export default credentialRouter;
