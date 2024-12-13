import {MouseEvent} from 'react'
import { useModalStore } from '../store/modal'
 
export default function useModal() {
    const {modal, showModalStore, hideModalStore} = useModalStore();

    const removeDiv = (clase:string = "modal-backdrop fade show") => {

        for(let i=0; i < document.getElementsByClassName(clase).length; i++) {
            document.getElementsByClassName(clase)[i].remove()
        }
    }

    const showModal = () => {
        document.getElementsByTagName('body')[0].classList.add('modal-open');
        document.getElementsByTagName('body')[0].setAttribute('style', "overflow: hidden; padding-right: 15px;");        
        
        let div = document.createElement('div');
        div.classList.add('modal-backdrop', 'fade', 'show');

        document.body.appendChild(div);

        showModalStore();
    }

    const hideModal = () => {
        document.getElementsByTagName('body')[0].classList.remove('modal-open');
        document.getElementsByTagName('body')[0].removeAttribute('style');

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
        hideModal,
        triggerModal,
        closeModal
    }
}
