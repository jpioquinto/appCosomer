import { z } from 'zod'

export const UsuarioSchema = z.object({
    id:z.number(),
    ur:z.optional(z.string()).nullable(),
    nickname:z.string(),
    estatus:z.number(),
    creado_el:z.string(),
    ultimo_acceso:z.optional(z.string()).nullable(),
    creador:z.optional(z.string().nullable()),
    perfil:z.optional(z.string()).nullable(),
    ur_id:z.optional(z.number()).nullable(),
    perfil_id:z.optional(z.number()).nullable()
})

export const UsuariosSchema = z.array(UsuarioSchema)

export type UsuarioSchema = z.infer<typeof UsuarioSchema>