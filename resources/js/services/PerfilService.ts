import { PerfilsSchema } from "../schema/perfil-schema";

export async function listadoPerfiles() {
    try {
        const response =  await axios.get('api/perfil/listado');  
        if (response.status) {
            const result = PerfilsSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}