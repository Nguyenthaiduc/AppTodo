import { RouterContext, validate, required, isEmail, Status } from '../deps.ts'

export const RegisterValidation = async({request , response} : RouterContext,next: () => Promise<unknown>) => {

    const body = await request.body().value;
    const [passes,errors] = await validate(body, {
        first_name : required,
        last_name : required,
        emial : [required,isEmail],
        password : required,
        password_confirm : required,
    });

    if(!passes) {
        response.status = Status.BadRequest; //status 403
        response.body = errors;
        return;
    }

    if(body.password !== body.password_confirm) {
        response.status = Status.BadRequest; //status 403
        response.body = {
            error : "The Password do not match"
        }
        return;
    }
    await next();

}