import { RowDataPacket } from "mysql2"

interface Inscricao extends RowDataPacket {
  id: number,
  id_evento: number,
  id_usuario: number,
  data_hora: Date
}

export default Inscricao