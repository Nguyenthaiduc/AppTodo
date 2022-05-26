import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models';
import { IUserRequest } from '../interfaces';
dotenv.config();

export const verifyToken = (req: IUserRequest, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];
	if (token !== undefined) {
		req.token = token;
		jwt.verify(token, <string>process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				res.json({
					result: false,
					message: 'fail to verify token ' + token,
				});
			} else {
				const user = decoded as User;
				req.userId = user.id;
				next();
			}
		});
	} else {
		res.json({ result: false, message: 'token is not exist' });
	}
};


