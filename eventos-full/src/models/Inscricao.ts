import { RowDataPacket } from "mysql2"
import { InscricaoStatus } from "../enums"

interface Inscricao extends RowDataPacket {
  id: number,
  id_evento: number,
  id_usuario: number,
  data_hora: Date,
  status: InscricaoStatus,
}

export default Inscricao