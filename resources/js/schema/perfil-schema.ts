import { z } from 'zod'

export const ItemPermiso = z.object({
    data:z.object({elemento_id: z.number(), padre_id: z.number()}),
    icon:z.string(),
    id:z.string(),
    text:z.string()
})

export const ChildrenPermiso = z.object({
    children:z.optional(z.array(ItemPermiso)).nullable()
})

export const ArbolPermiso = z.array(ItemPermiso.merge(ChildrenPermiso))

export const PerfilSchema = z.object({
    id:z.number(),
    nombre:z.string(),
    descripcion:z.string(),
    estatus:z.number(),  
    creado_el:z.string().nullable(),  
    creador:z.optional(z.string()).nullable(),  
})

export const PerfilsSchema = z.array(PerfilSchema)