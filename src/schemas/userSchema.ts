import { User } from '@prisma/client';
import Joi from 'joi';

export const userSchema = Joi.object<User>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});
