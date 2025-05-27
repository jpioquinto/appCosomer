import { create } from 'zustand'
import { listadoVertientes, listadoUnidades, listadoRegimenes, listadoOrganizaciones, listadoEstatus, listadoValuadores } from '../services/CatalogService'
import { EstatusSchema, OrganizacionesSchema, RegimenesSchema, UnidadesSchema, VertientesSchema } from '../types/catalog'
import type { Option } from '../types'

type CatalogState = {
    vertientes:VertientesSchema,
    unidades:UnidadesSchema,
    regimenes:RegimenesSchema,
    organizaciones:OrganizacionesSchema,
    estatus:EstatusSchema,
    optionsEstatus:Option[],
    valuadores:OrganizacionesSchema
    getOptionsEstatus:() => Option[], 
    setOptionsEstatus:(options: Option[]) => void, 
    getVertientes:() => VertientesSchema,
    getUnidades:() => UnidadesSchema,
    getRegimenes:() => RegimenesSchema,
    getOrganizaciones:() => OrganizacionesSchema,
    getEstatus:() => EstatusSchema,
    getValuadores:() => OrganizacionesSchema
    listVertientes:() => Promise<void>,
    listUnidades:() => Promise<void>,
    listRegimenes:() => Promise<void>,
    listOrganizaciones:() => Promise<void>,
    listEstatus:() => Promise<void>,
    listValuadores:() => Promise<void>,
}
export const useCatalogStore = create<CatalogState>((set, get) => ({
    optionsEstatus:[],
    vertientes:[],
    unidades:[],
    regimenes:[],
    organizaciones:[],
    estatus:[],
    valuadores:[],
    setOptionsEstatus:(optionsEstatus) => set({optionsEstatus}),
    getOptionsEstatus:() => get().optionsEstatus,
    getVertientes:() => get().vertientes,
    getUnidades:() => get().unidades,
    getRegimenes:() => get().regimenes,
    getOrganizaciones:() => get().organizaciones,
    getEstatus:() => get().estatus,
    getValuadores:() => get().valuadores,
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
    },
    listValuadores: async () => {
        const valuadores = await listadoValuadores()
        set({
            valuadores
        })
    },
}))