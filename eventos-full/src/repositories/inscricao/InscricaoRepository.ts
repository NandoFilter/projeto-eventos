import { InscricaoStatus } from "../../enums"
import { Inscricao } from "../../models"

export interface InscricaoRepository {
  findAll(): Promise<Inscricao[]>
  getById(id: number): Promise<Inscricao>
  findByEventAndUser(id_evento: number, id_usuario: number): Promise<Inscricao>
  getByUserId(id: number): Promise<Inscricao[]>
  add(data: Inscricao): Promise<Inscricao>
  update(status: InscricaoStatus, data: Inscricao): Promise<Inscricao>
  delete(id: number): Promise<void>
}