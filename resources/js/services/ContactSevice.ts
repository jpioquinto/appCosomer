import { PuestosSchema } from "../schema/contact-schema"
import { Contact } from "../types"
import $axios from '../utils/axios'

export async function listadoPuestos() {
    try {
        const response =  await $axios.get('api/contact/listado-puestos');  
        if (response.status==200) {
            const result = PuestosSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }   
        
        return []
    } catch(error) {
        return []      
    } 
}

export async function cargarFoto(archivo: File) {
    try {
        const formData = new FormData();
        formData.append('foto', archivo);
        const response =  await $axios.post('api/contact/subir-foto', formData);  
        return response.data;           
    } catch(error) {
        return error;      
    } 
}

export async function saveContacto(data: Contact) {
    try {
        const response =  await $axios.post('api/contact/save-info', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}