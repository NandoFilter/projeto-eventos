import { NextFunction, Request, Response } from "express";
import { Usuario } from "../../models";
import { HttpStatus } from "../../utils/HttpStatus";

export default async function LoginMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any;

  if (value) {
    let { email, senha } = value as Usuario;

    if (!email) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'E-mail inválido' });
    if (!senha) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Senha inválida' });

    next();
  } else {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum valor encontrado' });
  }
}