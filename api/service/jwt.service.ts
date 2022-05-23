import {RouterContext, create,getNumericDate,verify,Payload} from '../deps.ts'

export class JwtService {
    async create (id : string): Promise<string> {

        const key = Deno.env.get('SECRET_KEY') || '';
        const payload = {
            id,
            exp: getNumericDate(60 * 60 * 24) // 1day
        }

        const jwt = await create({alg :"HS512",typ : "JWT"},payload,key);

        return jwt;
    }

    async verify (jwt : string) : Promise<[Payload | undefined,Error | undefined]> {
        const key = Deno.env.get('SECRET_KEY') || '';

        try {
            const payload = await verify(jwt,key,"HS512");
            return [payload,undefined]
        
        }catch (err) {
            return [undefined,err]
        }
    }

    async userId(ctx: RouterContext): Promise<string> {
        const key = Deno.env.get('SECRET_KEY') || '';
    
        try {
          const jwt = ctx.cookies.get("jwt") || "";
          const { id } = await verify(jwt, key, "HS512");
          return id as string;
        } catch {
          return ""
        }
      }
    
}