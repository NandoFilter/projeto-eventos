import { Request, Response } from "express";
import { Evento } from "../models";
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  },
};

export default class EventosController {

  public static async findAll(req: Request, res: Response): Promise<Response<Evento[]>> {
    try {
      const response = await axios.get(`${process.env.FULL_API_URL}/eventos?token=${req.query.mainToken}`, config);

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
  
  public static async getById(req: Request, res: Response): Promise<Response<Evento>> {
    const { id } = req.params;

    try {
      const response = await axios.get(`${process.env.FULL_API_URL}/eventos/${id}?token=${req.query.mainToken}`, config);

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