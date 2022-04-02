import bcrypt from 'bcrypt';

import {IUser} from '../entity/user';
import {userRepository} from '../repositories/user/userRepository';
import {config} from '../configs/config';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPass = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPass };
        return await userRepository.createUser(dataToSave);
    }

    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return await userRepository.getUserByEmail(email);
    }

    public async updateById(user: IUser, id: number): Promise<IUser | undefined> {
        return await userRepository.updateById(user, id);
    }

    public async deleteById(id: number): Promise<void> {
        await userRepository.deleteById(+id);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
