import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.status(201).json(createdUser);
    }

    public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getAll();
        return res.json(users);
    }

    public async getByEmail(req: Request, res: Response): Promise<Response<IUser[]>> {
        const { email } = req.params;
        const user = await userService.getByEmail(email);
        return res.json(user);
    }

    public async updateById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const updatedUser = await userService.updateById(req.body, +id);
        return res.json(updatedUser);
    }

    public async deleteById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deletedUser = await userService.deleteById(+id);
        res.json(deletedUser);
    }
}

export const userController = new UserController();
