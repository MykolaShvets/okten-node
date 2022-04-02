import { Request } from 'express';

import { IUser } from '../entity/user';

export interface IRequestExtendet extends Request{
    user?: IUser
}
