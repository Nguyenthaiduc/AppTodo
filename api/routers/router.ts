import {Router} from '../deps.ts'
import {authHandler, rootHandler,todosHandler} from '../controllers/index.ts'
import {Register} from '../controllers/auth.controller.ts'
import { authMiddleware } from '../middleware/auth.middleware.ts'
import { loginValidation, registerValidation } from "../validations/index.ts";

const router = new Router();
router.get("/api",rootHandler.getHome);
router.get('/api/todos',authMiddleware,todosHandler.getTodos)
router.get('/api/todos/:id',todosHandler.get)

router.post('/api/todos',todosHandler.create)
router.post('/api/register',Register)
router.put('/api/todos/:id',todosHandler.update)
router.delete('/api/todos:id',todosHandler.remove)

router.post('/api/register',  registerValidation.RegisterValidation, authHandler.Register);
router.post('api/login',loginValidation.LoginValidation, authHandler.Login)
router.get('/api/user',authMiddleware,authHandler.Authenticate)

export default router;