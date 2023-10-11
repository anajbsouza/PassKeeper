import { Router } from 'express';
import { createUserSchema } from '../schemas/index-schema';

import { validateBody } from '../middlewares/validation-middleware';
import { signUpPost } from 'controllers/user-controller';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), signUpPost);

export { usersRouter };
