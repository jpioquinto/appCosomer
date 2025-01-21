import { create } from 'zustand'
import { listadoVertientes, listadoUnidades, listadoRegimenes, listadoOrganizaciones, listadoEstatus } from '../services/CatalogService'
import { EstatusSchema, OrganizacionesSchema, RegimenesSchema, UnidadesSchema, VertientesSchema } from '../types/catalog'

type CatalogState = {
    vertientes:VertientesSchema,
    unidades:UnidadesSchema,
    regimenes:RegimenesSchema,
    organizaciones:OrganizacionesSchema,
    estatus:EstatusSchema,
    getVertientes:() => VertientesSchema,
    getUnidades:() => UnidadesSchema,
    getRegimenes:() => RegimenesSchema,
    getOrganizaciones:() => OrganizacionesSchema,
    getEstatus:() => EstatusSchema,
    listVertientes:() => Promise<void>,
    listUnidades:() => Promise<void>,
    listRegimenes:() => Promise<void>,
    listOrganizaciones:() => Promise<void>,
    listEstatus:() => Promise<void>,
}
export const useCatalogStore = create<CatalogState>((set, get) => ({
    vertientes:[],
    unidades:[],
    regimenes:[],
    organizaciones:[],
    estatus:[],
    getVertientes:() => get().vertientes,
    getUnidades:() => get().unidades,
    getRegimenes:() => get().regimenes,
    getOrganizaciones:() => get().organizaciones,
    getEstatus:() => get().estatus,
    listVertientes: async () => {
        const vertientes = await listadoVertientes()
        set({
            vertientes
        })
    },
    listUnidades: async () => {
        const unidades = await listadoUnidades()
        set({
            unidades
        })
    },
    listRegimenes: async () => {
        const regimenes = await listadoRegimenes()
        set({
            regimenes
        })
    },
    listOrganizaciones: async () => {
        const organizaciones = await listadoOrganizaciones()
        set({
            organizaciones
        })
    },
    listEstatus: async () => {
        const estatus = await listadoEstatus()
        set({
            estatus
        })
    }
}))