import {MouseEvent} from 'react'
import { useModalStore } from '../store/modal'
import useClassModal from './useClassModal';
 
export default function useModal() {
    const {modal, showModalStore, hideModalStore} = useModalStore();
    const {addClassOpen, removeClassOpen, removeDiv} = useClassModal();

    const showModal = () => {
        addClassOpen();
        showModalStore();
    }

    const hideModal = () => {        
        removeClassOpen();
        removeDiv();
        hideModalStore();
    }

    const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        hideModal()
	}

    const triggerModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        showModal();
	}

    return {
        modal,
        showModal,
        hideModal,
        triggerModal,
        closeModal
    }
}
