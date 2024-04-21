import { Router } from "express";
import { EventosController } from "../controllers";
import EventosMiddleware from "../middlewares/eventos/EventosMiddleware";
import AuthMiddleware from "../middlewares/auth/AuthMiddleware";

const eventosRoutes = Router();

eventosRoutes.get('/eventos', AuthMiddleware, EventosController.findAll)
eventosRoutes.get("/eventos/:id", AuthMiddleware, EventosController.getById);
eventosRoutes.post("/eventos", AuthMiddleware, EventosMiddleware, EventosController.add);
eventosRoutes.put("/eventos/:id", AuthMiddleware, EventosMiddleware, EventosController.update);
eventosRoutes.delete("/eventos/:id", AuthMiddleware, EventosController.delete);

export default eventosRoutes;