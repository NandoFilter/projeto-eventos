import { Request, Response } from "express";
import { Inscricao } from "../models";
import { InscricaoRepositoryTransaction } from '../repositories/inscricao/InscricaoRepositoryTransaction';
import { InscricaoStatus } from "../enums";
import { LogRepositoryTransaction } from "../repositories/logs/LogRepositoryTransaction";

export default class InscricaosController {
  private static rep = new InscricaoRepositoryTransaction();
  private static log = new LogRepositoryTransaction();

  public static async findAll(req: Request, res: Response): Promise<Response<Inscricao[]>> {
    const inscricoes = await InscricaosController.rep.findAll();

    if (inscricoes) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricoes);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    const inscricao = await InscricaosController.rep.getById(parseInt(id));

    if (inscricao) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricao);
  }

  public static async getByUserId(req: Request, res: Response): Promise<Response<Inscricao[]>> {
    const { id } = req.params;

    const inscricao = await InscricaosController.rep.getByUserId(parseInt(id));

    if (inscricao) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricao);
  }

  public static async add(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.add(req.body);

    if (inscricao) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricao);
  }

  public static async confirm(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.update(InscricaoStatus.CONFIRMED, req.body);

    if (inscricao) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricao)
  }

  public static async checkIn(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.update(InscricaoStatus.CHECK_IN_DONE, req.body);

    if (inscricao) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricao)
  }

  public static async cancel(req: Request, res: Response): Promise<Response<Inscricao>> {
    const inscricao = await InscricaosController.rep.update(InscricaoStatus.CANCELED, req.body);

    if (inscricao) await InscricaosController.log.add(req.method, req.originalUrl)

    return res.json(inscricao)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    await InscricaosController.rep.delete(parseInt(id));

    await InscricaosController.log.add(req.method, req.originalUrl)

    return res.send("Inscrição excluída com sucesso").end();
  }
}