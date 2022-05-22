import { Context, cyan, green } from "../deps.ts";

export const logger = async(ctx:Context,next : () => Promise<unknown>)=> {
    try {
        await next();
        console.log(`${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)}`)
    
    }catch(err) {
        console.error(err)
    }
}