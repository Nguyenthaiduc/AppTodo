import {Router} from '../deps.ts'
import {rootHandler,todoHandler} from '../middleware/index.ts'

export const router = new Router();
router.get('/',rootHandler.getHome);
router.get('/todo',todoHandler.getTodos)