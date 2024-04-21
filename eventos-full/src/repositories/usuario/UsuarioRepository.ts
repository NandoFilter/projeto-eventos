import { Usuario } from "../../models"

export interface UsuarioRepository {
  findAll(): Promise<Usuario[]>
  getById(id: number): Promise<Usuario>
  add(data: Usuario): Promise<Usuario>
  update(id: number, data: Usuario): Promise<Usuario>
  delete(id: number): Promise<void>
}