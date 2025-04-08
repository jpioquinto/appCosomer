import z from 'zod'
import { Option } from '.'

import { RegistroSchema, RegistrosSchema, Etapas, Etapa, Parametros, Parametro, ValueCapture } from '../schema/conflicto-schema'

export type Registro  = z.infer<typeof RegistroSchema>

export type DraftRegistro = Omit<Registro, 'id'>

export type Registros = z.infer<typeof RegistrosSchema>

export type Etapas = z.infer<typeof Etapas>

export type Etapa  = z.infer<typeof Etapa> 

export type Parametros = z.infer<typeof Parametros>

export type Parametro  = z.infer<typeof Parametro>

export type ValueCapture = z.infer<typeof ValueCapture>

export type EstatusParam = {
    id:Registro['id'],
    estatus:Option
}

export type TypeSelectedFile = {
    parametroId:Parametro['id'],
    file:File[]
}