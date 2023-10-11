import { Router } from 'express';
import { singInPost } from '../controllers/authentication-controller';
import { signInSchema } from '../schemas/index-schema';
import { validateBody } from '../middlewares/validation-middleware';

const authenticationRouter = Router();

authenticationRouter.post('/', validateBody(signInSchema), singInPost);

export { authenticationRouter };
