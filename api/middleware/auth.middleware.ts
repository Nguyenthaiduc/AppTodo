import { RouterContext , Status} from '../deps.ts'
import { JwtUtils} from '../utils/mod.ts'

export const authMiddleware = async ({response,cookies} : RouterContext,next: () => Promise<unknown>) => {
    const jwtUtils = new JwtUtils();
    const result = await jwtUtils.verify(cookies.get("jwt") || "");

    if (!result) {
        response.status = Status.Unauthorized;
        response.body = {
          message: "Unauthenticated",
        };
        return;
      }

   return await next();
}