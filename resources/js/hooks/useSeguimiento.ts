import {MouseEvent} from 'react';

import { useConflictStore } from "../store/conflict/conflictStore";
import { useFileStore } from '../store/conflict/fileStore';
import { Etapa, Parametro } from "../types/conflicto";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function useSeguimiento() {
    const {captura, deleteCapturaEtapa, initCapture} = useConflictStore();

    const {upload} = useFileStore();

    const cerrarModal = () => MySwal.close();

    const clickBtnGuardar = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(upload)
        console.log(captura)
    }

    const eliminarCaptura = (parametro:Parametro) => {
        deleteCapturaEtapa(parametro.etapaId, parametro.id)
        cerrarModal()
    }

    return {
        clickBtnGuardar,
        eliminarCaptura,
        cerrarModal,
        initCapture,
        MySwal
    }
}