import z from 'zod'

export const PuestoSchema = z.object({
    id:z.number(),
    puesto:z.string()
})

export const PuestosSchema = z.array(PuestoSchema)