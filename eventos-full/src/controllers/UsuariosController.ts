import { Request, Response } from "express";
import { Usuario } from "../models";
import { UsuarioRepositoryTransaction } from '../repositories/usuario/UsuarioRepositoryTransaction';
import { LogRepositoryTransaction } from "../repositories/logs/LogRepositoryTransaction";

export default class UsuariosController {
  private static rep = new UsuarioRepositoryTransaction();
  private static log = new LogRepositoryTransaction();

  public static async findAll(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const usuarios = await UsuariosController.rep.findAll();

    if (usuarios) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuarios);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    const usuario = await UsuariosController.rep.getById(parseInt(id));

    if (usuario) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuario);
  }

  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const usuario = await UsuariosController.rep.add(req.body);

    if (usuario) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuario);
  }

  public static async update(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    const usuario = await UsuariosController.rep.update(parseInt(id), req.body);

    if (usuario) await UsuariosController.log.add(req.method, req.originalUrl)

    return res.json(usuario)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    await UsuariosController.rep.delete(parseInt(id));

    await UsuariosController.log.add(req.method, req.originalUrl)

    return res.send("Usuário excluído com sucesso").end();
  }
}