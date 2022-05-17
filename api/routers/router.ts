import {Router} from '../deps.ts'
import {rootHandler,todosHandler} from '../controllers/index.ts'

const router = new Router();
router.get("/api",rootHandler.getHome);
router.get('/api/todos',todosHandler.getTodos)
router.get('/api/todos/:id',todosHandler.get)
router.post('/api/todos',todosHandler.create)
router.put('/api/todos/:id',todosHandler.update)
router.delete('/api/todos:id',todosHandler.remove)

export default router;