import { Request, Response } from "express";
import { Usuario } from "../models";
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { HttpStatus } from "../utils/HttpStatus";

export default class UsuariosController {

  public static async add(req: Request, res: Response): Promise<Response<Usuario>> {
    const config: AxiosRequestConfig = UsuariosController.createConfig(req);

    try {
      const response = await axios.post(`${process.env.FULL_API_URL}/usuarios`, req.body, config);

      return res.json(response.data);
    }

    catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        let data = err.response.data ? err.response.data : error

        return res.status(err.response.status).json(data)
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  public static async auth(req: Request, res: Response): Promise<Response<Usuario>> {
    const config: AxiosRequestConfig = UsuariosController.createConfig(req);

    try {
      const response = await axios.post(`${process.env.FULL_API_URL}/usuarios/auth`, req.body, config);

      return res.json(response.data);
    }

    catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        let data = err.response.data ? err.response.data : error

        return res.status(err.response.status).json(data)
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  private static createConfig(req: Request): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: {
        user: req.headers.user,
        pass: req.headers.pass
      },
    };

    return config
  }
}