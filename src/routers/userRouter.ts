import { userController } from '../controllers/userController';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validation-middleware';
import { userSchema } from '../schemas/userSchema';


const usersRouter = Router();

usersRouter.post('/register', validateSchema(userSchema),  userController.signUp);
usersRouter.post('/login', validateSchema(userSchema), userController.logIn);

export default usersRouter;
