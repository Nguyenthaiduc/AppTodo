import { isEmail, required, RouterContext, Status, validate } from "../deps.ts";

export const LoginValidation = async ({request,response} : RouterContext,next: ()=> Promise<unknown>) => {
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