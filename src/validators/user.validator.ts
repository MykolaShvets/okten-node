import * as Joi from 'joi';

import { regex } from '../constants';

export const userValidator = {
    createUser: Joi.object({
        firstName: Joi
            .string()
            .min(1)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(1)
            .max(20)
            .required(),
        age: Joi
            .number()
            .min(18)
            .max(100)
            .required(),
        phone: Joi
            .string()
            .regex(regex.PHONE)
            .required(),
        email: Joi
            .string()
            .regex(regex.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(regex.PASSWORD)
            .required(),
    }),

    loginUser: Joi.object({
        email: Joi
            .string()
            .regex(regex.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(regex.PASSWORD)
            .required(),
    }),
};
