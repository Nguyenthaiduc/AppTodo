import {Router} from '../deps.ts'
import {authHandler, rootHandler,todosHandler} from '../controllers/index.ts'
import {Register} from '../controllers/auth.controller.ts'

const router = new Router();
router.get("/api",rootHandler.getHome);
router.get('/api/todos',todosHandler.getTodos)
router.get('/api/todos/:id',todosHandler.get)

router.post('/api/todos',todosHandler.create)
router.post('/api/register',Register)
router.put('/api/todos/:id',todosHandler.update)
router.delete('/api/todos:id',todosHandler.remove)

router.post('/api/register',  registerValidation.RegisterValidation, authHandler.Register);

export default router;