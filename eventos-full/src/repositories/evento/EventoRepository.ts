import { Evento } from "../../models"

export interface EventoRepository {
  findAll(): Promise<Evento[]>
  getById(id: number): Promise<Evento>
  add(data: Evento): Promise<Evento>
  update(id: number, data: Evento): Promise<Evento>
  delete(id: number): Promise<void>
}