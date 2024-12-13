import { z } from 'zod'
import {MouseEvent} from 'react'
import type { ModuloSchema, Modulo, MenuItem, Menu } from '../schema/modulo-schema'

export type Sidebar = {
    minimize:number
    firstToggle:boolean
    claseMinimize:string
}

export type User = {
    username:string,
    nombre:string,
    perfil:string
}
export type Auth = {
    isAuthenticated:boolean
    token:string
    user:User
}

export type Menu = z.infer<typeof Menu>

export type MenuItem = z.infer<typeof MenuItem>

export type Modulos = z.infer<typeof ModuloSchema>

export type Modulo = z.infer<typeof Modulo>

