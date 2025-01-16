import { PuestosSchema } from "../schema/contact-schema";

export async function listadoPuestos() {
    try {
        const response =  await axios.get('api/contact/listado-puestos');  
        if (response.status) {
            const result = PuestosSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}

export async function cargarFoto(archivo: File) {
    try {
        const formData = new FormData();
        formData.append('foto', archivo);
        const response =  await axios.post('api/contact/subir-foto', formData);  
        return response.data;           
    } catch(error) {
        return error;      
    } 
}