import type { DraftCaptura, DraftRegistro, Registro, EstatusParam, Parametro, FilterReport } from "../types/conflicto"
import { RegistrosSchema, Etapas, ResponseLoadFile } from "../schema/conflicto-schema"
import type { DraftFormConflicto } from "../types/form"
import $axios from '../utils/axios'

export async function listadoConflictos(data?: FilterReport) {
    try {
        const response =  await $axios.post('api/conflict/listado-conflictos', data);          
        if (response.data.solicitud) {
            const result = RegistrosSchema.safeParse(response.data?.listado);
            return result.success ? result.data : [];
        }              
    } catch(error) {
        return []      
    } 
}

export async function listadoEtapas(conflictoId: Registro['id']) {
    try {
        const response =  await $axios.get('/api/conflict/listado-etapas' + '/' + conflictoId);  
        if (response.status==200) {
            const result = Etapas.safeParse(response.data?.listado);            
            return result.success ? result.data : [];
        }              
    } catch(error) {
        return []      
    } 
}

export async function saveConflicto(data: DraftFormConflicto) {
    try {
        const response =  await $axios.post('api/conflict/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function updateConflicto(data: DraftFormConflicto) {
    try {
        const response =  await $axios.post('api/conflict/save', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function deleteConflicto(data) {
    try {
        const response =  await $axios.post('api/conflict/delete-conflicto', data);
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function changeStatusConflicto(data: EstatusParam) {
    try {
        const response =  await $axios.post('api/conflict/change-estatus', {id:data.id, estatus:data.estatus.value});
        
        return response.data
    } catch(error) {
        return error      
    } 
}

export async function uploadDoc(conflictoId: Registro['id'], parametroId: Parametro['id'], archivo: File) {
    try {
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('conflictoId', conflictoId.toString());
        formData.append('parametroId', parametroId.toString());

        const response =  await $axios.post('/api/conflict/upload-evidence', formData);
          
        if (response.hasOwnProperty('solicitud')) {
            const result = ResponseLoadFile.safeParse(response.data);            
            return result.success ? result.data : {};
        }
        return response.data;           
    } catch(error) {
        return error;      
    } 
}

export async function saveStage(data: DraftCaptura) {
    try {
        const response =  await $axios.post('/api/conflict/save-stage', data);
        
        return response.data;
    } catch(error) {
        return error      
    } 

}