import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';
import { COOKIE } from '../constants/cookie';
import { ITokenData } from '../interfaces/token.interface';
import {IRequestExtendet} from "../interfaces/requestExtendet.interface";

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtendet, res: Response): Promise<Response<string>> {
        console.log(req.user)

        res.clearCookie('COOKIE.nameRefreshToken');
        await tokenService.deleteUserTokenPair(3);

        return res.json('ok');
    }
}

export const authController = new AuthController();
