import { RegistrosSchema } from "../schema/conflicto-schema";
import type { DraftRegistro } from "../types/conflicto";

export async function listadoConflictos() {
    try {
        const response =  await axios.get('api/conflict/listado-conflictos');  
        if (response.status) {
            const result = RegistrosSchema.safeParse(response.data?.listado);            
            return result.success ? result.data : [];
        }              
    } catch(error) {
        return []      
    } 
}

export async function saveConflicto(data: DraftRegistro) {
    try {
        const response =  await axios.post('api/conflict/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}