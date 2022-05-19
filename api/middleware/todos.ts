import {Status,RouterContext} from '../deps.ts'
import { TodoRepository} from '../repositories/todo.repository.ts'
export const getTodos = async(ctx :RouterContext)=> {
    const todoRepository = new TodoRepository()
    const todos = await todoRepository.getAll()
    ctx.response.status = Status.OK; //similar res.status(200).json({})
    ctx.response.body = {
        data : todos,
    };
}