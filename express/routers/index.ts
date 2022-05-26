import { Application} from 'express';
import helloRoutes from './hello.routes';
import statusRoutes from './status.routes';
import todoRoutes from './todo.routes';
import userRoutes from './user.routes';

const routes = (app : Application) => {
    app.use('/',helloRoutes);
    app.use('/api/todo',todoRoutes);
    app.use('/api/user',userRoutes);
    app.use('/api/status',statusRoutes);
}
export default routes;