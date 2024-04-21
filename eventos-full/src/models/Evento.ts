import { RowDataPacket } from "mysql2"

interface Evento extends RowDataPacket {
  id: number,
  nome: string,
  data_hora: Date
}

export default Evento