import {RouterContext,Status,validate,required,isEmail} from '../deps.ts'

export const Login = async ({request,response} : RouterContext,next: ()=> Promise<unknown>) => {
    const body = await request.body().value;
    const [passes,error] = await validate(body, {
        email : [required , isEmail],
        password : required,
    });

    if(!passes) {
        response.status = Status.BadRequest;
        response.body = error
        return;
    }

    await next();
}