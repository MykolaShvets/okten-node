import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';
import { userValidator } from '../validators/user.validator';
import { paramsValidator } from '../validators/params.validator';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(404).json('Wrong login or password');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async validateCreateUser(req: IRequestExtendet, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidator.createUser.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validateLoginUser(req: IRequestExtendet, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidator.loginUser.validate(req.body);
            if (error) {
                throw new Error('Wrong login or password');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validateId(req: IRequestExtendet, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = paramsValidator.id.validate(req.params);
            if (error) {
                throw new Error('Wrong login or password');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
