import { Request, Response } from "express";
import { Inscricao } from "../models";
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export default class InscricoesController {

  public static async getById(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    const config: AxiosRequestConfig = InscricoesController.createConfig(req);

    try {
      const response = await axios.get(`${process.env.FULL_API_URL}/inscricoes/${id}`, config);

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

  public static async getByUserId(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    const config: AxiosRequestConfig = InscricoesController.createConfig(req);

    try {
      const response = await axios.get(`${process.env.FULL_API_URL}/inscricoes/usuario/${id}`, config);

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

  public static async add(req: Request, res: Response): Promise<Response<Inscricao>> {
    const config: AxiosRequestConfig = InscricoesController.createConfig(req);

    try {
      const response = await axios.post(`${process.env.FULL_API_URL}/inscricoes`, req.body, config);

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

  public static async delete(req: Request, res: Response): Promise<Response<Inscricao>> {
    const { id } = req.params;

    const config: AxiosRequestConfig = InscricoesController.createConfig(req);

    try {
      const response = await axios.delete(`${process.env.FULL_API_URL}/inscricoes/${id}`, config);

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