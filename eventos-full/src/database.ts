import mysql, { Connection, ConnectionOptions } from "mysql2/promise";

class Database {

  private static instance: Database;
  private constructor() { }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<Connection> {
    const access: ConnectionOptions = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    }

    return await mysql.createConnection(access)
  }
}

export default Database;