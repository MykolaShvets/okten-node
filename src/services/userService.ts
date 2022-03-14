import bcrypt from 'bcrypt';

import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPass = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPass };
        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getAll(): Promise<IUser[]> {
        const users = await userRepository.getAll();
        return users;
    }

    public async getByEmail(email: string): Promise<IUser> {
        const user = await userRepository.getByEmail(email);
        return user;
    }

    public async updateById(user: IUser, id: number): Promise<IUser> {
        const updatedUser = await userRepository.updateById(user, id);
        return updatedUser;
    }

    public async deleteById(id: number): Promise<void> {
        await userRepository.deleteById(+id);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
