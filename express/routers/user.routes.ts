import { Router } from "express";
import {signUp, getUser, login} from "../controllers";
import { verifyToken } from '../middlewares';
const route = Router();

route.post("/signup",signUp);
route.post("/login",login);
route.get("/:id",verifyToken, getUser);
export default route;