import { Router } from 'express'

import inscricoesRoutes from "./routes/InscricoesRoutes";

const routes = Router();

routes.use(inscricoesRoutes);

export default routes;