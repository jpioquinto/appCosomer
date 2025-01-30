import { useSegundaModalStore } from '../store/segundaModal';
import {MouseEvent} from 'react'
import useClassModal from './useClassModal';
 
export default function useSegundaModal() {
    const {segundaModal, showModalStore, hideModalStore} = useSegundaModalStore();
    const {addClassOpen, removeClassOpen, removeDiv} = useClassModal();

    const showSecondModal = () => {
        addClassOpen();
        showModalStore();
    }

    const hideSecondModal = () => {        
        removeClassOpen();
        removeDiv();
        hideModalStore();
    }

    const closeSecondModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        hideSecondModal()
    }

    const triggerSecondModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        showSecondModal();
    }

    return {
        segundaModal,
        showSecondModal,
        hideSecondModal,
        triggerSecondModal,
        closeSecondModal
    }
}
