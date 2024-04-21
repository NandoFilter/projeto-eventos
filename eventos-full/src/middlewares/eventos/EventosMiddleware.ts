import { NextFunction, Request, Response } from "express";
import { Evento } from "../../models";
import { HttpStatus } from "../../utils/HttpStatus";
import ApiError from "../../utils/ApiError";

export default async function EventosMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any;

  if (value) {
    let { nome, data_hora } = value as Evento;

    if (!nome) return next(new ApiError('Nome inválido', HttpStatus.BAD_REQUEST))

    if (!data_hora) return next(new ApiError('Data inválida', HttpStatus.BAD_REQUEST))

    next();
  } else {
    return next(new ApiError('Nenhum valor apresentado', HttpStatus.NOT_FOUND));
  }
}