import { Router } from "express";
import { UsuariosController } from "../controllers";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const usuariosRoutes = Router();

usuariosRoutes.post('/usuarios', AuthMiddleware, UsuariosController.add)
usuariosRoutes.post('/usuarios/auth', AuthMiddleware, UsuariosController.auth)

export default usuariosRoutes;