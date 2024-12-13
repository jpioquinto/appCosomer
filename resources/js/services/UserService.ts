export async function getUserByUsername($user:string) {
    
} 

export async function saveUser(data) {
    try {
        const response =  await axios.post('api/user/save', data);
        
        return response.data
        if (response.status==200) {                        
        }
    } catch(error) {
        return error      
    } 
}

export async function listadoUsuarios() {
    try {
        const response =  await axios.get('api/user/listado');        
        return response.data?.listado
    } catch(error) {
        return []      
    } 
}
