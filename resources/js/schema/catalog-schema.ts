import { array, z } from 'zod'

export const VertienteSchema = z.object({
    id:z.number(),
    vertiente:z.string(),
    estatus:z.number()
})

export const UnidadSchema = z.object({
    id:z.number(),
    descripcion:z.string(),
    unidad:z.string(),
    categoria:z.number(),
    estatus:z.number()
})

export const RegimenSocSchema = z.object({
    id:z.number(),
    regimen:z.string(),
    estatus:z.number()
})

export const OrganizacionSchema = z.object({
    id:z.number(),
    nombre:z.string(),
    acronimo:z.string(),
    estatus:z.number()
})

export const EstatuSchema = z.object({
    id:z.number(),
    descripcion:z.string(),
    tipo:z.number(),
    estatus:z.number()
})

export const VertientesSchema = z.array(VertienteSchema)

export const UnidadesSchema   = z.array(UnidadSchema)

export const RegimenesSchema  = z.array(RegimenSocSchema)

export const OrganizacionesSchema = z.array(OrganizacionSchema)

export const EstatusSchema = z.array(EstatuSchema)