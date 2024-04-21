import { Router } from "express";
import { InscricoesController } from "../controllers";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const inscricoesRoutes = Router();

inscricoesRoutes.get("/inscricoes/:id", AuthMiddleware, InscricoesController.getById);
inscricoesRoutes.get("/inscricoes/usuario/:id", AuthMiddleware, InscricoesController.getByUserId);
inscricoesRoutes.post('/inscricoes', AuthMiddleware, InscricoesController.add)
inscricoesRoutes.put('/inscricoes/confirm', AuthMiddleware, InscricoesController.confirm)
inscricoesRoutes.put('/inscricoes/checkIn', AuthMiddleware, InscricoesController.checkIn)
inscricoesRoutes.put('/inscricoes/cancel', AuthMiddleware, InscricoesController.cancel)
inscricoesRoutes.delete("/inscricoes/:id", AuthMiddleware, InscricoesController.delete);

export default inscricoesRoutes;