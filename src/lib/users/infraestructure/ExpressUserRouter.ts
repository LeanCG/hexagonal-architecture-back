import { Router } from "express";
import {ServiceContainer} from "../../shared/infraestructure/SrviceContainer" 
import {ExpressUserController} from "../infraestructure/ExpressUserController"

const controller = new ExpressUserController();
const ExpressUserRouter = Router();

ExpressUserRouter.get("/users/", controller.getAll);
ExpressUserRouter.get("/users/:id", controller.getOneById);
ExpressUserRouter.post("/users/", controller.create);
ExpressUserRouter.put("/users/", controller.edit);
ExpressUserRouter.delete("/users/:id", controller.delete);


export {ExpressUserRouter};