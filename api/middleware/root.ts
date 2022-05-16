import {Status,RouterContext} from '../deps.ts'

export const getHome = async(ctx:RouterContext)=> {
    ctx.response.status = Status.OK;
    ctx.response.body = "Todo List Api ";
}