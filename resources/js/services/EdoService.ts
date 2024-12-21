import { EdosSchema, MunpiosSchema } from "../schema/edo-schema";
import { MunpioSchema } from "../types";

export async function listadoEdos() {
    try {
        const response =  await axios.get('api/edo/listado-estados');  
        if (response.status) {
            const result = EdosSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}

export async function listadoMunpio(edoId: MunpioSchema['estado_id']) {
    try {
        const response =  await axios.get('api/edo/listado-munpios/' + edoId);  
        if (response.status) {
            const result = MunpiosSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }              
    } catch(error) {
        return []      
    } 
}

