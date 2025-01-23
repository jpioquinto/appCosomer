import type { DraftRegistro } from "../types/conflicto";

export async function saveConflicto(data: DraftRegistro) {
    try {
        const response =  await axios.post('api/conflict/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}