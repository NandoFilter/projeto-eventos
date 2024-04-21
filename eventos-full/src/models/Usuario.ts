import { RowDataPacket } from "mysql2"

interface Usuario extends RowDataPacket {
  id: number,
  nome: string,
  email: string,
  senha: string
}

export default Usuario