import Database from "../../database";
import { LogRepository } from "./LogRepository";

const TABLE_NAME = 'logs'

export class LogRepositoryTransaction implements LogRepository {
  async add(operation: string, route: string): Promise<any> {
    const conn = await Database.getInstance().connect();

    await conn.execute(`INSERT INTO ${TABLE_NAME} (operation, route, data_hora) VALUES (?, ?, ?)`,
      [operation, route, new Date()]
    );

    conn.end();
  }
}