import { z } from 'zod'

export const URSchema = z.object({
    id:z.number(),
    nombre:z.string(),
    estatus:z.number(),    
    sigla:z.string(),
    calle:z.optional(z.string()).nullable(),
    ext:z.optional(z.string().nullable()),
    int:z.optional(z.string()).nullable(),
    col:z.optional(z.string()).nullable(),
    cp:z.optional(z.string()).nullable(),
    edo:z.optional(z.string()).nullable(),    
    mpio:z.optional(z.string()).nullable(),
    edoId:z.optional(z.number()).nullable(),    
    mpioId:z.optional(z.number()).nullable()      
})

export const URsSchema = z.array(URSchema)