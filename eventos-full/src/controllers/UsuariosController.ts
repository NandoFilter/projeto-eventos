import { Request, Response } from "express";
import { Usuario } from "../models";
import { UsuarioRepositoryTransaction } from '../repositories/usuario/UsuarioRepositoryTransaction';

export default class UsuariosController {
  private static rep = new UsuarioRepositoryTransaction();

  public static async findAll(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const usuarios = await UsuariosController.rep.findAll();

    return res.json(usuarios);
  }

  public static async getById(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    const usuario = await UsuariosController.rep.getById(parseInt(id));

    return res.json(usuario);
  }

  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const usuario = await UsuariosController.rep.add(req.body);

    return res.json(usuario);
  }

  public static async update(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    const usuario = await UsuariosController.rep.update(parseInt(id), req.body);

    return res.json(usuario)
  }

  public static async delete(req: Request, res: Response): Promise<Response<Usuario>> {
    const { id } = req.params;

    await UsuariosController.rep.delete(parseInt(id));

    return res.send("Usuário excluído com sucesso").end();
  }
}