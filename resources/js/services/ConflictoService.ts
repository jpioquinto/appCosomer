import { RegistrosSchema } from "../schema/conflicto-schema";
import { Option } from "../types";
import type { DraftRegistro, Registro, EstatusParam } from "../types/conflicto";

export async function listadoConflictos(estatus: Array<number> | undefined) {
    try {
        const response =  await axios.get('api/conflict/listado-conflictos' + (estatus ? '/' + estatus.join(',') : ''));  
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

export async function updateConflicto(data: Registro) {
    try {
        const response =  await axios.post('api/conflict/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function deleteConflicto(data) {
    try {
        const response =  await axios.post('api/conflict/delete-conflicto', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function changeStatusConflicto(data: EstatusParam) {
    try {
        const response =  await axios.post('api/conflict/change-estatus', {id:data.id, estatus:data.estatus.value});
        
        return response.data
    } catch(error) {
        return error      
    } 
}