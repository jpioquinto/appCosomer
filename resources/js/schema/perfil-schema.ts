import { z } from 'zod'

export const PerfilSchema = z.object({
    id:z.number(),
    nombre:z.string(),
    descripcion:z.string()  
})

export const PerfilsSchema = z.array(PerfilSchema)