import { Router } from "express";
import { InscricoesController } from "../controllers";
import InscricoesMiddleware from "../middlewares/inscricoes/InscricoesMiddleware";
import CreateMiddleware from "../middlewares/inscricoes/CreateMiddleware";
import UpdateMiddleware from "../middlewares/inscricoes/UpdateMiddleware";
import AuthMiddleware from "../middlewares/auth/AuthMiddleware";

const inscricoesRoutes = Router();

inscricoesRoutes.get('/inscricoes', AuthMiddleware, InscricoesController.findAll)
inscricoesRoutes.get("/inscricoes/:id", AuthMiddleware, InscricoesController.getById);
inscricoesRoutes.get("/inscricoes/usuario/:id", AuthMiddleware, InscricoesController.getByUserId);
inscricoesRoutes.post("/inscricoes", AuthMiddleware, InscricoesMiddleware, CreateMiddleware, InscricoesController.add);
inscricoesRoutes.put("/inscricoes/confirm", AuthMiddleware, InscricoesMiddleware, UpdateMiddleware, InscricoesController.confirm);
inscricoesRoutes.put("/inscricoes/checkIn", AuthMiddleware, InscricoesMiddleware, UpdateMiddleware, InscricoesController.checkIn);
inscricoesRoutes.put("/inscricoes/cancel", AuthMiddleware, InscricoesMiddleware, UpdateMiddleware, InscricoesController.cancel);
inscricoesRoutes.delete("/inscricoes/:id", AuthMiddleware, InscricoesController.delete);

export default inscricoesRoutes;