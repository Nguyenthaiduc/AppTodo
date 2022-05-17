import {Status, RouterContext} from '../deps.ts'

export const getHome = (ctx : RouterContext) => {
    ctx.response.status = Status.OK; //similar res.status(200)
    ctx.response.body = "Todo List API with NodeJS"
    console.log(ctx.response.body)
    
};
