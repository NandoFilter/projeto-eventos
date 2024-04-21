import { Router } from "express";
import { EventosController } from "../controllers";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const eventosRoutes = Router();

eventosRoutes.get('/eventos', AuthMiddleware, EventosController.findAll)
eventosRoutes.get("/eventos/:id", AuthMiddleware, EventosController.getById);

export default eventosRoutes;