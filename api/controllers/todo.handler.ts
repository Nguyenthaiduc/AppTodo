import {Status, RouterContext} from '../deps.ts'

import { getParams,handleError,handleOk} from '../middleware/utils.ts'
import { TodoRepository } from '../repositories/todo.repository.ts'
import { JwtService } from '../service/jwt.service.ts'

//trả về tất cả khi dùng METHOD 'GET'
export const getAll = async (ctx : RouterContext) => {
    const todoRepository = new TodoRepository();
    const todos = await todoRepository.getAll();


    ctx.response.status = Status.OK;
    ctx.response.body = {
        data : todos,
    }

}
//Get Method
export const get = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const todoRepository = new TodoRepository();
    const [todos,error] = await todoRepository.get(params)
    if(error) {
        return handleError(ctx,error);
    }

    handleOk(ctx,todos);
}

//Post Method
export const create = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const todoRepository = new TodoRepository();
    await todoRepository.create(params);

    ctx.response.status = Status.OK;
    handleOk(ctx, "Post successfully !")
    
}
//Update Method
export const update = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const todoRepository = new TodoRepository();
    const [_,error] =  await todoRepository.update(params)

    if(error) {
        return handleError(ctx,error);
    }
    handleOk(ctx," Update successfully !")
   
}

//Delete Method
export const remove = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const todoRepository = new TodoRepository();
    const [_,error] = await todoRepository.remove(params);

    if(error) {
        return handleError(ctx,error);
    }
    handleOk(ctx," Remove successfully !")
}
