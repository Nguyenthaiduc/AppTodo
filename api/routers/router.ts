import {Router} from '../deps.ts'
import {AuthHandler , RootHandler,TodoHandler,UserHandler   } from '../controllers/index.ts'
import { authMiddleware } from '../middleware/auth.middleware.ts'
import { loginValidation, registerValidation } from "../validations/index.ts";
import { TodoRepository, UserRepository } from '../repositories/index.ts';
import { JwtService } from '../service/index.ts'

const router = new Router();
const todoHandler = new TodoHandler(new TodoRepository(), new JwtService());

//Todo
const rootHandler = new RootHandler();
router.get("/v1",(ctx) => rootHandler.getHome(ctx))
    

router.get('/v1/todos',authMiddleware,(ctx)=> todoHandler.getAll(ctx))
router.get('/v1/todos/:id',authMiddleware,(ctx)=> todoHandler.get(ctx))

router.post('/v1/todos',authMiddleware,(ctx)=> todoHandler.create(ctx))
router.put('/v1/todos/:id',authMiddleware,(ctx)=> todoHandler.update(ctx))
router.delete('/v1/todos:id',authMiddleware,(ctx)=> todoHandler.remove(ctx))


//Authenticate
const authHandler = new AuthHandler(new UserRepository(), new JwtService());
router.post('/v1/signup',  registerValidation.RegisterValidation, (ctx) => authHandler.signup(ctx));
router.post('/v1/login',  loginValidation.LoginValidation, (ctx) => authHandler.login(ctx));
router.post('/v1/logout', (ctx) => authHandler.logout(ctx));

// User
const userHandler = new UserHandler(new UserRepository(),new JwtService());
router.get('/v1/user',authMiddleware,(ctx) => userHandler.getUser(ctx));

export default router;