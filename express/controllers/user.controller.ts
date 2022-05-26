import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';
import { getMongoRepository } from 'typeorm';
import {
	IUserRequest,
	ResponseData,
	ResponseError,
	ResponseUser,
} from '../interfaces';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export const getUserByName = async (name:string)=>{
    try{
        await getMongoRepository(User).findOneOrFail({where: {userName:name}});
        return true;
    }
    catch{
        return false;
    }
}

export const getUser = async (req : IUserRequest, res: Response) => {
    try {
        const userId = req.params.id;
        if(req.userId === userId) {
            const userRepo = getMongoRepository(User);
            const user : User = await userRepo.findOneOrFail({where : {_id : new ObjectId(userId)}});
            if(!user) {
                res.json(new ResponseError("User Not Found"));
            }
            
            res.json(new ResponseData("Get User Success",user));
        } else {
            res.json(new ResponseError("Token not found." ));
        }

    } catch (err) {
        res.json(new ResponseError("Fail To Get User",err));
    }
    }

    export const signUp = async (req: Request, res: Response) => {

        try {
            const newUser : User = <User>req.body;
            const user = new User();
            user.userName = newUser.userName;

            const checkUser = await getUserByName(newUser.userName);
            if(checkUser) {
                res.json(new ResponseError("User Already exist"));
                return;
            }
            user.password = await bcrypt.hash(newUser.password,5);
            const userRepo = getMongoRepository(User);
            userRepo.save(user);
            const token : string = jwt.sign({
                id : user.id,
                userName : user.userName,
            }, <string>process.env.SECRET_KEY,{expiresIn : "12h"})
            res.json(new ResponseUser("Create user success",user,token));

        } catch (err) {
            res.json(new ResponseError("Fail to create user",err))
        }
    }

    export const login = async (req: IUserRequest, res: Response) => {

        const user : User = <User>req.body;
        const userRepo = getMongoRepository(User);
        try {

            const getUser : User | undefined = await userRepo.findOneOrFail({where : {userName : user.userName}});
            const validPassword = await bcrypt.compare(user.password,getUser.password);
            if(!validPassword) {
                res.json(new ResponseError("Password is not correct."));
            }
            let token = jwt.sign({
                id: getUser.id,
                userName: getUser.userName,
                 }, <string>process.env.SECRET_KEY, { expiresIn: "24h" });
            res.json(new ResponseUser("Login Success",{id : getUser.id, userName : getUser.userName},token));



        } catch (err) {
            res.json(new ResponseError("User does not exist.", err));
        }

    }


