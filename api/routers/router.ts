import {Router} from '../deps.ts'
import {authHandler, rootHandler,todoHandler} from '../controllers/index.ts'
import {Register} from '../controllers/auth.handler.ts'
import { authMiddleware } from '../middleware/auth.middleware.ts'
import { loginValidation, registerValidation } from "../validations/index.ts";

const router = new Router();
router.get("/api",rootHandler.getHome);
router.get('/api/todos',authMiddleware,todoHandler.getAll)
router.get('/api/todos/:id',todoHandler.get)

router.post('/api/todos',todoHandler.create)
router.post('/api/register',Register)
router.put('/api/todos/:id',todoHandler.update)
router.delete('/api/todos:id',todoHandler.remove)

router.post('/api/register',  registerValidation.RegisterValidation, authHandler.Register);
router.post('api/login',loginValidation.LoginValidation, authHandler.Login)
router.get('/api/user',authMiddleware,authHandler.Authenticate)

export default router;