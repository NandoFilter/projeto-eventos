import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../utils/HttpStatus";

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { user, pass } = req.headers;

  if (!user || !pass) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Credenciais não encontradas' });
  }

  if (user !== `${process.env.AUTH_USER}` || pass !== `${process.env.AUTH_PASS}`) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Credenciais inválidas' });
  }

  next();
}