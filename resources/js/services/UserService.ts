import { UsuariosSchema } from "../schema/usuario-schema";


export async function saveUser(data) {
    try {
        const response =  await axios.post('api/user/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function savePasswd(data) {
    try {
        const response =  await axios.post('api/user/save-passwd', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function listadoUsuarios() {
    try {
        const response =  await axios.get('api/user/listado-user');  
        if (response.status) {
            const result = UsuariosSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}

export async function changeStatus(data) {
    try {
        const response =  await axios.post('api/user/change-status', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function changeUR(data) {
    try {
        const response =  await axios.post('api/user/change-ur', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function changePerfil(data) {
    try {
        const response =  await axios.post('api/user/change-perfil', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}