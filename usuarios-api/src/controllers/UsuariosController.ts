import { Request, Response } from "express";
import { Usuario } from "../models";
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export default class UsuariosController {

  public static async add(req: Request, res: Response): Promise<Response<Usuario[]>> {
    const config: AxiosRequestConfig = UsuariosController.createConfig(req);

    try {
      const response = await axios.post(`${process.env.FULL_API_URL}/usuarios`, req.body, config);

      return res.json(response.data);
    }

    catch (error) {
      const err = error as AxiosError;

      if (err.response && err.response.data) {
        return res.status(err.response.status).json(err.response.data)
      }

      return res.json(error)
    }
  }

  private static createConfig(req: Request): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${req.query.mainToken}`,
      },
    };

    return config
  }
}