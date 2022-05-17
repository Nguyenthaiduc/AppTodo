import {Router} from '../deps.ts'
import {rootHandler,todosHandler} from '../controllers/index.ts'

export const router = new Router();
router.get('/',rootHandler.getHome);
router.get('/todos',todosHandler.getTodos)
router.get('/todos/:id',todosHandler.get)
router.post('/todos',todosHandler.create)
router.put('/todos/:id',todosHandler.update)
router.delete('/todos:id',todosHandler.remove)