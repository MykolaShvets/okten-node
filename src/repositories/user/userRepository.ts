import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getAll(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    public async getByEmail(email: string): Promise<any> {
        return getManager().getRepository(User).createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getOne();
    } // робив Promise<IUser | undefined> але чомусь вибивало помилку не зміг зрозуміти чому

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
