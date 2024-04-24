import Database from "../../database";
import { Usuario } from "../../models"
import { UsuarioRepository } from "./UsuarioRepository";

const TABLE_NAME = 'usuarios'

export class UsuarioRepositoryTransaction implements UsuarioRepository {
  async findAll(): Promise<Usuario[]> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Usuario[]>(`SELECT * FROM ${TABLE_NAME}`);

    conn.end()

    return rows;
  }

  async getById(id: number): Promise<Usuario> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Usuario[]>(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end()

    return rows[0] ?? undefined;
  }

  async getUserByLogin(email: string, senha: string): Promise<Usuario> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Usuario[]>(`SELECT * FROM ${TABLE_NAME} WHERE email = ? AND senha = ?`,
      [email, senha]
    );

    conn.end()

    return rows[0] ?? undefined;
  }

  async add(data: Usuario): Promise<Usuario> {
    const conn = await Database.getInstance().connect();

    await conn.execute(`INSERT INTO ${TABLE_NAME} (nome, email, senha) VALUES (?, ?, ?)`,
      [data.nome, data.email, data.senha]
    );

    conn.end();

    return data;
  }

  async update(id: number, data: Usuario): Promise<Usuario> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Usuario[]>(`UPDATE ${TABLE_NAME} SET nome = ?, email = ?, senha = ? WHERE id = ?`,
      [data.nome, data.email, data.senha, id]
    );

    conn.end();

    return data;
  }

  async delete(id: number): Promise<void> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Usuario[]>(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end();
  }
}