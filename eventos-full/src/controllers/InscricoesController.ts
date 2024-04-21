import { Request, Response } from "express";
import { Inscricao } from "../models";
import { InscricaoRepositoryTransaction } from '../repositories/inscricao/InscricaoRepositoryTransaction';
import { InscricaoStatus } from "../enums";

export default class InscricaosController {
  private static rep = new InscricaoRepositoryTransaction();

  public static async findAll(req: Request, res: Response): Promise<Response<Inscricao[]>> {
    const inscricoes = await InscricaosController.rep.findAll();

    return res.json(inscricoes);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    const inscricao = await InscricaosController.rep.getById(parseInt(id));

    return res.json(inscricao);
  }

  public static async getByUserId(req: Request, res: Response): Promise<Response<Inscricao[]>> {
    const { id } = req.params;

    const inscricao = await InscricaosController.rep.getByUserId(parseInt(id));

    return res.json(inscricao);
  }

  public static async add(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.add(req.body);

    return res.json(inscricao);
  }

  public static async confirm(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.update(InscricaoStatus.CONFIRMED, req.body);

    return res.json(inscricao)
  }

  public static async checkIn(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.update(InscricaoStatus.CHECK_IN_DONE, req.body);

    return res.json(inscricao)
  }

  public static async cancel(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.update(InscricaoStatus.CANCELED, req.body);

    return res.json(inscricao)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    await InscricaosController.rep.delete(parseInt(id));

    return res.send("Inscrição excluída com sucesso").end();
  }
}