import express from "express";
import { getStatusList } from "../controllers";
import { verifyToken } from '../middlewares';
const routes = express.Router();

routes.get("/", getStatusList);

export default routes;