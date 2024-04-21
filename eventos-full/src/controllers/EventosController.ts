import { Request, Response } from "express";
import { Evento } from "../models";
import { EventoRepositoryTransaction } from '../repositories/evento/EventoRepositoryTransaction';
import { HttpStatus } from "../utils/HttpStatus";

export default class EventosController {
  private static eventoRepo = new EventoRepositoryTransaction();

  public static async findAll(req: Request, res: Response): Promise<Response<Evento[]>> {
    const eventos = await EventosController.eventoRepo.findAll();

    return res.json(eventos);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    const evento = await EventosController.eventoRepo.getById(parseInt(id));

    return res.json(evento);
  }

  public static async add(req: Request, res: Response): Promise<any> {
    const evento = await EventosController.eventoRepo.add(req.body);

    return res.json(evento);
  }

  public static async update(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    const evento = await EventosController.eventoRepo.update(parseInt(id), req.body);

    return res.json(evento)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    await EventosController.eventoRepo.delete(parseInt(id));

    return res.status(HttpStatus.OK).send("Evento excluído com sucesso").end();
  }
}