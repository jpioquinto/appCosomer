import { PerfilsSchema, ArbolPermiso } from "../schema/perfil-schema";
import type { PerfilSchema } from "../types";

export async function listadoPerfiles() {
    try {
        const response =  await axios.get('api/perfil/listado-perfil');  
        if (response.status) {
            const result = PerfilsSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}


export async function listadoPermisos(id: PerfilSchema['id'] | undefined) {
    try {
        const response =  await axios.get('api/perfil/arbol-permisos/'+id);  
        if (response.status) {
            const result = ArbolPermiso.safeParse(response.data?.listado);
            //console.log(result)
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}