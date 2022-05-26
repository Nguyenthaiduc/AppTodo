import express from 'express';
import { getHello } from '../controllers';
import { verifyToken } from '../middlewares';

const routes = express.Router();

routes.get('/',getHello);

export default routes;
