import { NextFunction, Request, Response } from "express";
import { Inscricao } from "../../models";
import { HttpStatus } from "../../utils/HttpStatus";
import { UsuarioRepositoryTransaction } from "../../repositories/usuario/UsuarioRepositoryTransaction";
import { EventoRepositoryTransaction } from "../../repositories/evento/EventoRepositoryTransaction";

export default async function InscricoesMiddleware(req: Request, res: Response, next: NextFunction) {
  const value = req.body as any;

  if (value) {
    let { id_evento, id_usuario, data_hora } = value as Inscricao;

    if (!id_evento) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Evento inválido' });
    if (!id_usuario) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Usuário inválido' });

    const evento = await new EventoRepositoryTransaction().getById(id_evento)
    const usuario = await new UsuarioRepositoryTransaction().getById(id_usuario)

    if (!evento) return res.status(HttpStatus.NOT_FOUND).json({ error: 'Evento não encontrado' });
    if (!usuario) return res.status(HttpStatus.NOT_FOUND).json({ error: 'Usuário não encontrado' });

    if (!data_hora) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Data inválida' });

    next();
  } else {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum valor encontrado' });
  }
}