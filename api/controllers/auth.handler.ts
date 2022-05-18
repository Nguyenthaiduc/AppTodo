import { RouterContext,bcrypt} from '../deps.ts'
import { User } from '../models/user.ts'


export const Register = async ({request,response} : RouterContext) => {
    const body = await request.body().value;
    const user = new User();


    
}

export const Login = async ({request,response} : RouterContext) => {
    const [email,password] = await request.body().value;

    

}