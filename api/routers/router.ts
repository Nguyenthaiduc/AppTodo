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
router.get("/api",(ctx) => rootHandler.getHome(ctx))
    

router.get('/api/todos',authMiddleware,(ctx)=> todoHandler.getAll(ctx))
router.get('/api/todos/:id',todoHandler,(ctx)=> todoHandler.get(ctx))

router.post('/api/todos',authMiddleware,(ctx)=> todoHandler.create(ctx))
router.put('/api/todos/:id',authMiddleware,(ctx)=> todoHandler.update(ctx))
router.delete('/api/todos:id',authMiddleware,(ctx)=> todoHandler.remove(ctx))


//Authenticate
const authHandler = new AuthHandler(new UserRepository(), new JwtService());
router.post('/api/signup',  registerValidation.RegisterValidation, (ctx) => authHandler.signup(ctx));
router.post('/api/login',  loginValidation.LoginValidation, (ctx) => authHandler.login(ctx));
router.post('/api/logout', (ctx) => authHandler.logout(ctx));

// User
const userHandler = new UserHandler(new UserRepository(),new JwtService());
router.get('/api/user',authMiddleware,(ctx) => userHandler.getUser(ctx));

export default router;