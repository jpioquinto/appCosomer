import {MouseEvent, useEffect, useState} from 'react';

import { Etapa, Parametro, DraftCaptura } from "../types/conflicto";
import { useConflictStore } from "../store/conflict/conflictStore";
import { saveStage, uploadDoc } from '../services/ConflictoService';
import { useFileStore } from '../store/conflict/fileStore';
import { useConfigStore } from '../store/config';
import { useConflicto } from './useConflicto';
import { notificacion } from '../utils';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useModalStore } from '../store/modal';

const MySwal = withReactContent(Swal)

export function useSeguimiento() {
    const {upload, resetUpload, setLoadTotal, setProcessed, setCancel, setTotal, getProcessed, getTotal, getCancel, getLoadTotal} = useFileStore();

    const {
        captura, conflicto, removeCapture, getCaptura, updateEvidenceCapture, resetRemoveCapture, setRemoveCapture, getRemoveCapture, 
        resetCaptura, deleteCapturaEtapa, initCapture} = useConflictStore();

    const {setIntervalId, getIntervalId} = useConfigStore();

    const {keyModal, setKeyModal} = useModalStore();

    const cerrarModal = () => MySwal.close();

    const {catalog} = useConflicto();

    const loadCatalog = () => {        
        catalog.getValuadores().length == 0 ? catalog.listValuadores() : undefined
    }

    const reset = () => {
        resetUpload({}); resetCaptura({}); setLoadTotal(0); setCancel(0); setTotal(0);
        resetRemoveCapture([])
    }

    const uploadFiles = (parametroId: Parametro['id'], files: File[]) => {
        let total = getLoadTotal();
        let processed = getProcessed();
        files.forEach(async file => {
            const result = await uploadDoc(conflicto.id, parametroId, file);
            if (result.solicitud) {
                setLoadTotal(++total) 
                updateEvidenceCapture(parametroId, result.path)
            }
            setProcessed(++processed);            
        });
    }
    
    const processUpload = () => {
        return new Promise(resolve => {
            for (const parametroId in upload) {
                uploadFiles(+parametroId, upload[parametroId])
            }

            const iTimer = setInterval(()=> {//console.log(getProcessed())
                if (getProcessed() < (getTotal() + getCancel())) {
                    return;
                }

                if (getLoadTotal() > 0) {
                    notificacion(`Se han cargado ${getLoadTotal()} evidencia(s).`, 'info');
                }

                clearInterval(getIntervalId());
                setTimeout(() => resolve(null), 1000)
            },500)

            setIntervalId(iTimer);            
        })
    }

    const save = async () => {      //console.log(getCaptura())  
        try {
            let params = {conflictoId: conflicto.id, captures: JSON.stringify(getCaptura())}
            getRemoveCapture().length > 0 ? params['removes'] = getRemoveCapture() : undefined
            const result = await saveStage(params as DraftCaptura)
            if (result?.solicitud) {  
                reset();          
                notificacion(result.message, 'success');
            } else {
                throw new Error(result?.response?.data?.message || result.message);
            }
        } catch(error) {
            notificacion(error.message, 'error');
        }
    }

    const clickBtnGuardar = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        /*console.log(upload)
        console.log(captura)*/
        setProcessed(0);
        Object.keys(upload).length > 0 ? processUpload().then(save) : save()
    }

    const eliminarCaptura = (parametro:Parametro) => {
        deleteCapturaEtapa(parametro.etapaId, parametro.id)
        setRemoveCapture(parametro.capturaId)
        cerrarModal()
    }

    return {
        data:{captura, upload, removeCapture},
        clickBtnGuardar,
        eliminarCaptura,
        setKeyModal,
        cerrarModal,
        initCapture,
        loadCatalog,
        reset,
        keyModal,
        MySwal
    }
}