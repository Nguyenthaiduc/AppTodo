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

export const get = async (ctx : RouterContext) => {
    const params = await getParams(ctx);
    const [todos,error] = await todoModel.get(params)
    if(error) {
        return handleError(ctx,error);
    }

    handleOk(ctx,error);
}
