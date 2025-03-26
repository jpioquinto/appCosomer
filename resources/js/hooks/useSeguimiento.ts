import {MouseEvent} from 'react';

import { useConflictStore } from "../store/conflict/conflictStore";
import { Etapa, Captura } from "../types/conflicto";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function useSeguimiento() {
    const {captura} = useConflictStore();

    const clickBtnGuardar = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        console.log(captura)
    }

    return {
        clickBtnGuardar,
        MySwal
    }
}