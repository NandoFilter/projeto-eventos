import { Router } from "express";
import { InscricoesController } from "../controllers";
import InscricoesMiddleware from "../middlewares/inscricoes/InscricoesMiddleware";
import AuthMiddleware from "../middlewares/auth/AuthMiddleware";

const inscricoesRoutes = Router();

inscricoesRoutes.get('/inscricoes', AuthMiddleware, InscricoesController.findAll)
inscricoesRoutes.get("/inscricoes/:id", AuthMiddleware, InscricoesController.getById);
inscricoesRoutes.get("/inscricoes/usuario/:id", AuthMiddleware, InscricoesController.getByUserId);
inscricoesRoutes.post("/inscricoes", AuthMiddleware, InscricoesMiddleware, InscricoesController.add);
inscricoesRoutes.put("/inscricoes/:id", AuthMiddleware, InscricoesMiddleware, InscricoesController.update);
inscricoesRoutes.delete("/inscricoes/:id", AuthMiddleware, InscricoesController.delete);

export default inscricoesRoutes;