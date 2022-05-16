import {Context , isHttpError,Status} from '../deps.ts';

export const errorHandler = async(ctx:Context,next: ()=> Promise<unknown>)=> {
    try {
        await next();

    } catch (err) {
        if(!isHttpError(err)) {
            ctx.response.status = Status.InternalServerError; //error 500
            ctx.response.body = {
                err: {
                    message : err.message,
                    stack: err.stack,
                }
            };
        }
    }
}