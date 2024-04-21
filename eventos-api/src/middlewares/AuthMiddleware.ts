import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/HttpStatus";
import { AxiosRequestConfig } from 'axios';

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  };

  const bearerToken = req.headers.authorization;
  
  if (!bearerToken || bearerToken !== config.headers?.Authorization) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token de autorização não fornecido ou no formato inválido' });
  }

  next();
}