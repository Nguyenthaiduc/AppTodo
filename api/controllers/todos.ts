import {Status, RouterContext} from '../deps.ts'
import { todoModel } from '../models/index.ts'
import { getParams,handleError,handleOk} from '../middleware/utils.ts'

//trả về tất cả khi dùng METHOD 'GET'
export const getTodos = async (ctx : RouterContext) => {
    const todos = todoModel.getAll();

    ctx.response.status = Status.OK;
    ctx.response.body = {
        data : todos,
    }

}
//Get Method
export const get = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const [todos,error] = await todoModel.get(params)
    if(error) {
        return handleError(ctx,error);
    }

    handleOk(ctx,todos);
}

//Post Method
export const create = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    await todoModel.create(params);

    ctx.response.status = Status.OK;
    handleOk(ctx, "Post successfully !")
    
}
//Update Method
export const update = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const [_,error] =  await todoModel.update(params)

    if(error) {
        return handleError(ctx,error);
    }
    handleOk(ctx," Update successfully !")
   
}

//Delete Method
export const remove = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const [_,error] = await todoModel.remove(params);

    if(error) {
        return handleError(ctx,error);
    }
    handleOk(ctx," Remove successfully !")
}
