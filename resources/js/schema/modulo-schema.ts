
import { z } from 'zod'

export const Accion = z.object({
    clase:z.string(),
    descripcion:z.string().nullable(),
    estatus:z.number(),
    icono:z.string(),
    id:z.number()
})

export const Modulo = z.object({    
    acciones:z.optional(z.array(Accion)),
    clase:z.string(),
    controlador:z.string(),
    descripcion:z.string().nullable(),
    icono:z.string(),
    id:z.number(),
    nodo_padre:z.number(),
    nombre:z.string(),
    orden:z.number()
})

export const ModuloSchema = z.array(Modulo)

export type ModuloSchema = z.infer<typeof ModuloSchema>