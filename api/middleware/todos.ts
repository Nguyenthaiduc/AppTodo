import {Status,RouterContext} from '../deps.ts'

export const getTodos = async(ctx :RouterContext)=> {
    ctx.response.status = Status.OK; //similar res.status(200).json({})
    ctx.response.body = "Todo"
}