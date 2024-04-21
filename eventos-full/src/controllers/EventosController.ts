import { Request, Response } from "express";
import { Evento } from "../models";
import { EventoRepositoryTransaction } from '../repositories/evento/EventoRepositoryTransaction';

export default class EventosController {
  private static rep = new EventoRepositoryTransaction();

  public static async findAll(req: Request, res: Response): Promise<Response<Evento[]>> {
    const eventos = await EventosController.rep.findAll();

    return res.json(eventos);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    const evento = await EventosController.rep.getById(parseInt(id));

    return res.json(evento);
  }

  public static async add(req: Request, res: Response): Promise<Response<Evento>> {
    const evento = await EventosController.rep.add(req.body);

    return res.json(evento);
  }

  public static async update(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    const evento = await EventosController.rep.update(parseInt(id), req.body);

    return res.json(evento)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    await EventosController.rep.delete(parseInt(id));

    return res.send("Evento excluído com sucesso").end();
  }
}