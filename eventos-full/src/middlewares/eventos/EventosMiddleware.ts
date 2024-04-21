import { NextFunction, Request, Response } from "express";
import { Evento } from "../../models";
import { HttpStatus } from "../../utils/HttpStatus";

export default async function EventosMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any;

  if (value) {
    let { nome, data_hora } = value as Evento;

    if (!nome) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Nome inválido' });
    if (!data_hora) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Data inválida' });

    next();
  } else {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum valor encontrado' });
  }
}