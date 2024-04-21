import { Router } from 'express'

import usuariosRoutes from "./routes/UsuariosRoutes";

const routes = Router();

routes.use(usuariosRoutes);

export default routes;