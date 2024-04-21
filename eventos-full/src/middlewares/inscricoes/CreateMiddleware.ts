import { NextFunction, Request, Response } from "express";
import { Inscricao } from "../../models";
import { HttpStatus } from "../../utils/HttpStatus";
import { InscricaoRepositoryTransaction } from "../../repositories/inscricao/InscricaoRepositoryTransaction";

export default async function InscricoesMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any;

  if (value) {
    let { id_evento, id_usuario } = value as Inscricao;

    const inscricao = await new InscricaoRepositoryTransaction().findByEventAndUser(id_evento, id_usuario)

    if (inscricao) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Inscrição já cadastrada' });

    next();
  } else {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum valor encontrado' });
  }
}