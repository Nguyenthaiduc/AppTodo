import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { getMongoRepository } from 'typeorm';
import { IUserRequest } from '../interfaces';
import { ResponseData, ResponseError } from '../interfaces';
import { Todo } from '../models';

interface Pagination {
    page : number;
    limit: number;
}
//get All Todo
export const getTodoList = async(req: IUserRequest,res : Response)=> {
    try {
        const pagination = req.query as unknown as Pagination;
        pagination.limit = pagination.limit ? parseInt(pagination.limit.toString()) : 10 ;
        pagination.page = pagination.page ? parseInt(pagination.page.toString()) : 1 ;

        const userId = req.userId;
        const todoRepo = getMongoRepository(Todo);
        const todoList: Array<Todo> | [] = (
			await todoRepo.find({ where: { userId: userId } })
		).slice(
			(pagination.page - 1) * pagination.limit,
			pagination.page * pagination.limit + pagination.limit
		);
        
        res.json({
            result: true,
            data: todoList,
            message: "Get TodoList Successfully !"

        })
    } catch (err) {
        console.log("Error Get Todo",err);
        res.json({
            result: false,
            message: "Failed Get TodoList !"

        })
    }
}
