import { z } from 'zod'
import { VertientesSchema, UnidadesSchema, RegimenesSchema, OrganizacionesSchema, EstatusSchema } from "../schema/catalog-schema"

export type VertientesSchema = z.infer<typeof VertientesSchema>

export type UnidadesSchema = z.infer<typeof UnidadesSchema>

export type RegimenesSchema = z.infer<typeof RegimenesSchema>

export type OrganizacionesSchema = z.infer<typeof OrganizacionesSchema>

export type EstatusSchema = z.infer<typeof EstatusSchema>