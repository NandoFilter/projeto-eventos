import Database from "../../database";
import { Evento } from "../../models"
import { EventoRepository } from "./EventoRepository";

const TABLE_NAME = 'eventos'

export class EventoRepositoryTransaction implements EventoRepository {
  async findAll(): Promise<Evento[]> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Evento[]>(`SELECT * FROM ${TABLE_NAME}`);

    conn.end()

    return rows;
  }

  async getById(id: number): Promise<Evento> {
    const conn = await Database.getInstance().connect();

    const [rows] = await conn.execute<Evento[]>(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end()

    return rows[0] ?? undefined;
  }

  async add(data: Evento): Promise<Evento> {
    const conn = await Database.getInstance().connect();

    await conn.execute(`INSERT INTO ${TABLE_NAME} (nome, data_hora) VALUES (?, ?)`,
      [data.nome, data.data_hora]
    );

    conn.end();

    return data;
  }

  async update(id: number, data: Evento): Promise<Evento> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Evento[]>(`UPDATE ${TABLE_NAME} SET nome = ?, data_hora = ? WHERE id = ?`,
      [data.nome, data.data_hora, id]
    );

    conn.end();

    return data;
  }

  async delete(id: number): Promise<void> {
    const conn = await Database.getInstance().connect();

    await conn.execute<Evento[]>(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);

    conn.end();
  }
}