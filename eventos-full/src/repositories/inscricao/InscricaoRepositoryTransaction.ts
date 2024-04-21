import Database from "../../database";
import { InscricaoStatus } from "../../enums";
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

  async findByEventAndUser(id_evento: number, id_usuario: number): Promise<Inscricao> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Inscricao[]>(`SELECT * FROM ${TABLE_NAME} WHERE id_evento = ? AND id_usuario = ?`,
      [id_evento, id_usuario]
    );

    conn.end()

    return rows[0] ?? undefined;
  }

  async getByUserId(id: number): Promise<Inscricao[]> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Inscricao[]>(`SELECT * FROM ${TABLE_NAME} WHERE id_usuario = ?`, [id]);

    conn.end()

    return rows;
  }

  async add(data: Inscricao): Promise<Inscricao> {
    const conn = await Database.getInstance().connect();

    await conn.execute(`INSERT INTO ${TABLE_NAME} (id_evento, id_usuario, data_hora, status) VALUES (?, ?, ?, ?)`,
      [data.id_evento, data.id_usuario, new Date(), InscricaoStatus.NEW]
    );

    conn.end();

    return data;
  }

  async update(status: InscricaoStatus, data: Inscricao): Promise<Inscricao> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Inscricao[]>(`UPDATE ${TABLE_NAME} SET status = ? WHERE id_evento = ? AND id_usuario = ?`,
      [status, data.id_evento, data.id_usuario]
    );

    conn.end();

    data.status = status

    return data;
  }

  async delete(id: number): Promise<void> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Inscricao[]>(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end();
  }
}