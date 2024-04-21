import { Router } from 'express'

import EventosRoutes from "./routes/EventosRoutes";
import UsuarioRoutes from "./routes/UsuarioRoutes";
import InscricaoRoutes from "./routes/InscricaoRoutes";

const routes = Router();

routes.use(EventosRoutes);
routes.use(UsuarioRoutes);
routes.use(InscricaoRoutes);

export default routes;