import { Router } from 'express'

import EventosRoutes from "./routes/EventosRoutes";
import UsuarioRoutes from "./routes/UsuarioRoutes";

const routes = Router();

routes.use(EventosRoutes);
routes.use(UsuarioRoutes);

export default routes;