
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
    activo:z.optional(z.string()),
    clase:z.string(),
    controlador:z.string(),
    descripcion:z.string().nullable(),
    grupo:z.optional(z.number()),
    icono:z.string(),
    id:z.number(),
    nodo_padre:z.number(),
    nombre:z.string(),
    orden:z.number(),
    ruta:z.optional(z.string()).nullable()
})

export const Items = z.object({items:z.optional( z.array(Modulo) ).nullable()})

export const MenuItem = Modulo.merge(Items)

export const Menu  = z.array(MenuItem)

//export type Modulo  = z.infer<typeof Modulo>

export const ModuloSchema = z.array(Modulo)

export type ModuloSchema = z.infer<typeof ModuloSchema>
