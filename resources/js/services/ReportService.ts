import { FilterReport } from "../types/conflicto"
import { RegistrosSchema } from "../schema/conflicto-schema";

export async function reportListConflicts(data: FilterReport) {
    try {
        const response =  await axios.post('api/conflict/report/listado-conflictos', data);  
        if (response.status==200) {
            const result = RegistrosSchema.safeParse(response.data?.listado);            
            return result.success ? result.data : [];
        }              
    } catch(error) {
        return []      
    } 

    return []
}