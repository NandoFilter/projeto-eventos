import { NextFunction, Request, Response } from "express";
import { Usuario } from "../../models";
import { HttpStatus } from "../../utils/HttpStatus";

export default async function EventosMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any;

  if (value) {
    let { nome, email, senha } = value as Usuario;

    if (!nome) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Nome inválido' });
    if (!email) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'E-mail inválido' });
    if (!senha) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Senha inválida' });

    next();
  } else {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum valor encontrado' });
  }
}