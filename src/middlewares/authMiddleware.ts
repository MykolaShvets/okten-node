import { NextFunction } from 'express';
import { tokenService } from '../services/tokenService';
import { userService } from "../services/userService";
import {IRequestExtendet} from "../interfaces/requestExtendet.interface";

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const authToken = req.get('Autorization');

            if (!authToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const userFromToken = await userService.getByEmail(userEmail);

            if (!userFromToken){
                throw new Error('no token  ')
            }

            req.user = userFromToken;


            next();
        } catch (e: any) {
            console.log(e.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
