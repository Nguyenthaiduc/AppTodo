import { RouterContext , Status} from '../deps.ts'
import { JwtService} from '../service/jwt.service.ts'

export const authMiddleware = async ({response,cookies} : RouterContext,next: () => Promise<unknown>) => {
    const jwtService = new JwtService();
    const result = await jwtService.verify(cookies.get("jwt") || "");

    if (!result) {
        response.status = Status.Unauthorized;
        response.body = {
          message: "Unauthenticated",
        };
        return;
      }

   return await next();
}