import z from 'zod'
import { Option } from '.'

import { RegistroSchema, RegistrosSchema } from '../schema/conflicto-schema'

export type Registro  = z.infer<typeof RegistroSchema>

export type DraftRegistro = Omit<Registro, 'id'>

export type Registros = z.infer<typeof RegistrosSchema>

export type EstatusParam = {
    id:Registro['id'],
    estatus:Option
}
