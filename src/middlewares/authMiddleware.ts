import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtendet } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            console.log(e.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
