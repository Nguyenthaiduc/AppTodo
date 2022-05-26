import { Request } from 'express';

export interface IUserRequest extends Request {
    token?: string;
    userId?: string;
}
