import Database from "../../database";
import { Inscricao } from "../../models"
import { InscricaoRepository } from "./InscricaoRepository";

const TABLE_NAME = 'inscricoes'

export class InscricaoRepositoryTransaction implements InscricaoRepository {
  async findAll(): Promise<Inscricao[]> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Inscricao[]>(`SELECT * FROM ${TABLE_NAME}`);

    conn.end()

    return rows;
  }

  async getById(id: number): Promise<Inscricao> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Inscricao[]>(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end()

    return rows[0] ?? undefined;
  }

  async add(data: Inscricao): Promise<Inscricao> {
    const conn = await Database.getInstance().connect();

    await conn.execute(`INSERT INTO ${TABLE_NAME} (id_evento, id_usuario, data_hora) VALUES (?, ?, ?)`,
      [data.id_evento, data.id_usuario, data.data_hora]
    );

    conn.end();

    return data;
  }

  async update(id: number, data: Inscricao): Promise<Inscricao> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Inscricao[]>(`UPDATE ${TABLE_NAME} SET id_evento = ?, id_usuario = ?, data_hora = ? WHERE id = ?`,
      [data.id_evento, data.id_usuario, data.data_hora, id]
    );

    conn.end();

    return data;
  }

  async delete(id: number): Promise<void> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Inscricao[]>(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end();
  }
}