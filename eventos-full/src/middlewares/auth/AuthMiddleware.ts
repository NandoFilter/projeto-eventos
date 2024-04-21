import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../utils/HttpStatus";

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const mainToken = req.query.token;
  
  if (!mainToken || mainToken !== process.env.MAIN_TOKEN) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token de autorização não fornecido ou no formato inválido' });
  }

  next();
}