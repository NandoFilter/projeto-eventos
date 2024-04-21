import { Router } from 'express'

import eventosRoutes from "./routes/EventosRoutes";

const routes = Router();

routes.use(eventosRoutes);

export default routes;