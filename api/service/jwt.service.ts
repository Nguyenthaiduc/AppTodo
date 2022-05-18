import { create,getNumericDate,verify,Payload} from '../deps.ts'

export class JwtService {
    async create (id : string) {

        const key = Deno.env.get('SECRET_KEY') || '';
        const payload = {
            id,
            exp: getNumericDate(60 * 60 * 24) // 1day
        }

        const jwt = await create({alg :"HS512",typ : "JWT"},payload,key);

        return jwt;
    }

    async verify (jwt : string) {
        const key = Deno.env.get('SECRET_KEY') || '';

        try {
            const payload = await verify(jwt,key,"HS512");
            return [payload,undefined]
        
        }catch (err) {
            return [undefined,err]
        }
    }
}