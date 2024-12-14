import { z } from 'zod'
import {MouseEvent} from 'react'
import { type ModuloSchema, type Modulo, type MenuItem, type Menu, Acciones } from '../schema/modulo-schema'
import { UsuarioSchema, type UsuariosSchema  } from '../schema/usuario-schema'

export type Sidebar = {
    minimize:number
    firstToggle:boolean
    claseMinimize:string
}

export type UserAuth = {
    username:string,
    nombre:string,
    perfil:string
}

export type Users = z.infer<typeof UsuariosSchema>

export type User = z.infer<typeof UsuarioSchema>

export type Auth = {
    isAuthenticated:boolean
    token:string
    user:User
}

export type Acciones = z.infer<typeof Acciones>

export type Menu = z.infer<typeof Menu>

export type MenuItem = z.infer<typeof MenuItem>

export type Modulos = z.infer<typeof ModuloSchema>

export type Modulo = z.infer<typeof Modulo>

