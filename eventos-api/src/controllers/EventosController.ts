import { Request, Response } from "express";
import { Evento } from "../models";
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { HttpStatus } from "../utils/HttpStatus";

export default class EventosController {

  public static async findAll(req: Request, res: Response): Promise<Response<Evento[]>> {
    const config: AxiosRequestConfig = EventosController.createConfig(req);

    try {
      const response = await axios.get(`${process.env.FULL_API_URL}/eventos`, config);

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

  public static async getById(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    const config: AxiosRequestConfig = EventosController.createConfig(req);

    try {
      const response = await axios.get(`${process.env.FULL_API_URL}/eventos/${id}`, config);

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