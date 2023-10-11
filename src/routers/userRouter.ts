import { userController } from '../controllers/userController';
import { Router } from 'express';


const usersRouter = Router();

// Rota para registrar um novo usuário
usersRouter.post('/register', userController.signUp);
usersRouter.post('/login', userController.logIn);

export default usersRouter;
