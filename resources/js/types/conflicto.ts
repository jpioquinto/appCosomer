import z from 'zod'
import { Option } from '.'

import { RegistroSchema, RegistrosSchema, Etapas, Etapa, Parametros, Parametro, ValueCapture, ResponseLoadFile } from '../schema/conflicto-schema'

export type Registro  = z.infer<typeof RegistroSchema>

export type DraftRegistro = Omit<Registro, 'id'>

export type Registros = z.infer<typeof RegistrosSchema>

export type Etapas = z.infer<typeof Etapas>

export type Etapa  = z.infer<typeof Etapa> 

export type Parametros = z.infer<typeof Parametros>

export type Parametro  = z.infer<typeof Parametro>

export type ValueCapture = z.infer<typeof ValueCapture>

export type ResponseLoadFile = z.infer<typeof ResponseLoadFile>

export type EstatusParam = {
    id:Registro['id'],
    estatus:Option
}

export type TypeSelectedFile = {
    parametroId:Parametro['id'],
    file:File[]
}

export type DraftCaptura = {
    conflictoId:Registro['id'],
    captures:string
    removes?:Parametro['capturaId'][],
}

export type FilterReport = {
    entidades?:string,
    munpios?:string,
    vertiente?:string,
    anio?:string,
    estatus?:string,
    texto?:string
}

export type InputType = {
    inputType: string,
    value:string|number,    
}

export type Superficie = {
    ha:number,
    a:number,
    ca:number
}