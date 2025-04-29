import { FilterReport } from "../types/conflicto"
import { RegistrosSchema } from "../schema/conflicto-schema";

export async function reportListConflicts(data: FilterReport) {
    try {
        const response =  await axios.post('api/conflict/report/listado-conflictos', data);  
        if (response.data.solicitud) {
            const result = RegistrosSchema.safeParse(response.data?.listado);            
            return result.success ? result.data : [];
        }              
    } catch(error) {
        return [];      
    } 
    return [];
}

export async function downloadReport(data: FilterReport) {
    try {
        const response =  await axios.post('api/conflict/report/excel', data);  
        return response.data;                   
    } catch(error) {
        return {solicitud:false, message:'Falló la operación de Descarga.'};     
    } 
}