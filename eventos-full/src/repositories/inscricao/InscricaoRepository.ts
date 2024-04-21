import { Inscricao } from "../../models"

export interface InscricaoRepository {
  findAll(): Promise<Inscricao[]>
  getById(id: number): Promise<Inscricao>
  getByUserId(id: number): Promise<Inscricao[]>
  add(data: Inscricao): Promise<Inscricao>
  update(id: number, data: Inscricao): Promise<Inscricao>
  delete(id: number): Promise<void>
}