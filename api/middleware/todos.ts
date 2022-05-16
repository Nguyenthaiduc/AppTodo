import {Status,RouterContext} from '../deps.ts'
import {todoModel} from '../models/index.ts'

export const getTodos = async(ctx :RouterContext)=> {
    const todos = await todoModel.getAll()
    ctx.response.status = Status.OK; //similar res.status(200).json({})
    ctx.response.body = {
        data : todos,
    };
}