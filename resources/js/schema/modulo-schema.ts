
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
    estatus:z.optional(z.number()),
    icono:z.string(),
    id:z.number(),
    nodo_padre:z.number(),
    nombre:z.string(),
    orden:z.number(),
    ruta:z.optional(z.string()).nullable()
})

export const RegistroModulo = Modulo.merge( z.object({acciones:z.optional( z.string() ).nullable()}) )

export const RegistrosModulo = z.array(RegistroModulo)

export type RegistrosModulo  = z.infer<typeof RegistrosModulo>

export type RegistroModulo   = z.infer<typeof RegistroModulo>

export type DraftRegModulo = Omit<RegistroModulo, 'id'>

export const Items = z.object({items:z.optional( z.array(Modulo) ).nullable()})

export const MenuItem = Modulo.merge(Items)

export const Menu  = z.array(MenuItem)

export const Acciones  = z.array(Accion)

export const ModuloSchema = z.array(Modulo)

export type ModuloSchema = z.infer<typeof ModuloSchema>
