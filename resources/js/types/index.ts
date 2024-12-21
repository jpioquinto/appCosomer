import { z } from 'zod'
import { type ModuloSchema, type Modulo, type MenuItem, type Menu, Acciones, Accion } from '../schema/modulo-schema'
import { UsuarioSchema, type UsuariosSchema  } from '../schema/usuario-schema'
import { URsSchema, URSchema } from '../schema/ur-schema'
import { PerfilSchema, PerfilsSchema } from '../schema/perfil-schema'
import { EdosSchema, MunpioSchema, MunpiosSchema } from '../schema/edo-schema'

export type Sidebar = {
    minimize:number
    firstToggle:boolean
    claseMinimize:string
}

export type PropsModal = {
    show:boolean,
    clase:string
}

export type UserAuth = {
    username:string,
    nombre:string,
    perfil:string
}

export type Option = {
    value:number,
    label:string,
    sigla:string | undefined | null
}

export type Users = z.infer<typeof UsuariosSchema>

export type User = z.infer<typeof UsuarioSchema>

export type Auth = {
    isAuthenticated:boolean
    token:string
    user:User
}

export type Accion   = z.infer<typeof Accion> 

export type Acciones = z.infer<typeof Acciones>

export type Menu = z.infer<typeof Menu>

export type MenuItem = z.infer<typeof MenuItem>

export type Modulos = z.infer<typeof ModuloSchema>

export type Modulo = z.infer<typeof Modulo>

export type URSchema = z.infer<typeof URSchema>

export type URsSchema = z.infer<typeof URsSchema>

export type PerfilSchema = z.infer<typeof PerfilSchema>

export type PerfilsSchema = z.infer<typeof PerfilsSchema>

export type EdosSchema    = z.infer<typeof EdosSchema>

export type MunpiosSchema = z.infer<typeof MunpiosSchema>

export type MunpioSchema  = z.infer<typeof MunpioSchema>
