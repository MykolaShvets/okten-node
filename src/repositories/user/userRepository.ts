import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User).createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getOne();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getAll(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    public async updateById(user: IUser, id: number): Promise<any> {
        const { email, password } = user;
        return getManager().getRepository(User)
            .update({ id }, { email, password });
    }

    public async deleteById(id: number): Promise<void> {
        await getManager()
            .getRepository(User)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();
