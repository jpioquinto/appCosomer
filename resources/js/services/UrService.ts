import { URsSchema } from "../schema/ur-schema"
import $axios from '../utils/axios'

export async function listadoURs() {
    try {
        const response =  await $axios.get('api/ur/listado-ur');         
        if (response.data.solicitud) {
            const result = URsSchema.safeParse(response.data?.listado);            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return error      
    } 
}

export async function saveUR(data) {
    try {
        const response =  await $axios.post('api/ur/save-ur', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function deleteUR(data) {
    try {
        const response =  await $axios.post('api/ur/delete-ur', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}
