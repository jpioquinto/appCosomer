import { z } from 'zod'
import type { ModuloSchema } from '../schema/modulo-schema'

export type Sidebar = {
    minimize:number
    firstToggle:boolean
    claseMinimize:string
}

export type Auth = {
    isAuthenticated:boolean
    token:string
}

export type items = z.infer<typeof ModuloSchema>