import { Router } from "express";
import { InscricoesController } from "../controllers";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const inscricoesRoutes = Router();

inscricoesRoutes.get("/inscricoes/:id", AuthMiddleware, InscricoesController.getById);
inscricoesRoutes.get("/inscricoes/usuario/:id", AuthMiddleware, InscricoesController.getById);
inscricoesRoutes.post('/inscricoes', AuthMiddleware, InscricoesController.add)
inscricoesRoutes.delete("/inscricoes/:id", AuthMiddleware, InscricoesController.delete);

export default inscricoesRoutes;