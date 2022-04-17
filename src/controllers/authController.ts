import {Request, Response} from 'express';

import {authService, emailServise, tokenService, userService} from '../services';
import {COOKIE} from '../constants/cookie';
import {IRequestExtendet, ITokenData} from '../interfaces';
import {IUser} from '../entity/user';
import {tokenRepository} from '../repositories/token/tokenRepository';
import {emailActionEnum} from "../constants";

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);

        await emailServise.sendMail(req.body.email, emailActionEnum.REGISTRATION);

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtendet, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie('COOKIE.nameRefreshToken');
        await tokenService.deleteUserTokenPair(id);

        return res.json('ok');
    }

    public async login(req: IRequestExtendet, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailServise.sendMail(email, emailActionEnum.WELCOME);

            await userService.compareUserPasswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async refreshToken(req: IRequestExtendet, res: Response) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
