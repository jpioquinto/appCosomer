import { z } from 'zod'

export const EdoSchema = z.object({
    id:z.number(),
    estado:z.string(),
    estado_iso:z.string(),
    abreviatura:z.string()   
})

export const MunpioSchema = z.object({
    id:z.number(),
    estado_id:z.number(),
    municipio:z.string(),
    cve_mun:z.number()   
})

export const EdosSchema = z.array(EdoSchema)

export const MunpiosSchema = z.array(MunpioSchema)