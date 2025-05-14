import { DraftRegModulo, Menu, ModuloSchema, RegistroModulo, RegistrosModulo } from '../schema/modulo-schema'
import $axios from '../utils/axios'

export async function getModulos() {
    try {
        const response =  await $axios.get('api/permisos');
        //console.log(response)
        if (response.status==200) {
            const result = ModuloSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }
    } catch(error) {
        console.log(error);        
    }        
}

export async function getMenu() {
    try {
        const response =  await $axios.get('api/menu');
        //console.log(response)
        if (response.status==200) {
            const result = Menu.safeParse(response.data?.menu);
            
            return result.success ? result.data : []
        }
    } catch(error) {
        console.log(error);        
    }        
}

export async function listadoModulos() {
    try {
        const response =  await $axios.get('api/admin/listado-modulos');  
        if (response.status) {
            const result = RegistrosModulo.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}

export async function changeStatusModulo(data) {
    try {
        const response =  await $axios.post('api/admin/delete-modulo', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function saveModulo(data: DraftRegModulo, id:RegistroModulo['id']|undefined) {
    try {
        const response =  await $axios.post('api/admin/save-modulo', {...data, id});
        
        return response.data
    } catch(error) {
        return error      
    } 
}
