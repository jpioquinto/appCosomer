import { UsuariosSchema } from "../schema/usuario-schema";


export async function saveUser(data) {
    try {
        const response =  await axios.post('api/user/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function listadoUsuarios() {
    try {
        const response =  await axios.get('api/user/listado');  
        if (response.status) {
            const result = UsuariosSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}
