import { z } from 'zod'

export const ContactoSchema = z.object({
    nombre:z.optional(z.string()).nullable(),
    apPaterno:z.optional(z.string()).nullable(),
    apMaterno:z.optional(z.string()).nullable(),
    cargo:z.optional(z.string()).nullable(),
    puestoId:z.optional(z.number()).nullable(),
    munpioId:z.optional(z.number()).nullable(),
    edoId:z.optional(z.number()).nullable(),
    correo:z.optional(z.string()).nullable(),
    foto:z.optional(z.string()).nullable()
})

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