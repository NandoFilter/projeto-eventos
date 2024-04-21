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

  public static async confirm(req: Request, res: Response): Promise<Response<Inscricao>> {
    return InscricoesController.changeStatus(req, res, 'confirm')
  }

  public static async checkIn(req: Request, res: Response): Promise<Response<Inscricao>> {
    return InscricoesController.changeStatus(req, res, 'checkIn')
  }

  public static async cancel(req: Request, res: Response): Promise<Response<Inscricao>> {
    return InscricoesController.changeStatus(req, res, 'cancel')
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
        user: req.headers.user,
        pass: req.headers.pass
      },
    };

    return config
  }

  private static async changeStatus(req: Request, res: Response, path: string): Promise<Response<Inscricao>> {
    const config: AxiosRequestConfig = InscricoesController.createConfig(req);

    try {
      const response = await axios.put(`${process.env.FULL_API_URL}/inscricoes/${path}`, req.body, config);

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
}