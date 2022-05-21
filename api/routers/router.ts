import {Router} from '../deps.ts'
import {authHandler, rootHandler,TodoHandler} from '../controllers/index.ts'
import {Register} from '../controllers/auth.handler.ts'
import { authMiddleware } from '../middleware/auth.middleware.ts'
import { loginValidation, registerValidation } from "../validations/index.ts";
import { TodoRepository } from '../repositories/todo.repository.ts';
import { JwtService } from '../service/jwt.service.ts'

const router = new Router();
const todoHandler = new TodoHandler(new TodoRepository(), new JwtService());

router.get("/api",rootHandler.getHome);
router.get('/api/todos',authMiddleware,(ctx)=> todoHandler.getAll(ctx))
router.get('/api/todos/:id',todoHandler,(ctx)=> todoHandler.get(ctx))

router.post('/api/todos',authMiddleware,(ctx)=> todoHandler.create(ctx))
router.post('/api/register',Register)
router.put('/api/todos/:id',authMiddleware,(ctx)=> todoHandler.update(ctx))
router.delete('/api/todos:id',authMiddleware,(ctx)=> todoHandler.remove(ctx))

//Register
router.post('/api/register',  registerValidation.RegisterValidation, authHandler.Register);

//Authenticate
router.post('api/login',loginValidation.LoginValidation, authHandler.Login)
router.get('/api/user',authMiddleware,authHandler.Authenticate)




export default router;