export default function useClassModal() {
    const removeDiv = (clase:string = "modal-backdrop fade show") => {

        for(let i=0; i < document.getElementsByClassName(clase).length; i++) {
            document.getElementsByClassName(clase)[i].remove()
        }
    }

    const addClassOpen = () => {
        document.getElementsByTagName('body')[0].classList.add('modal-open');
        document.getElementsByTagName('body')[0].setAttribute('style', "overflow: hidden; padding-right: 15px;");        
        
        let div = document.createElement('div');
        div.classList.add('modal-backdrop', 'fade', 'show');

        document.body.appendChild(div);
    }

    const removeClassOpen = () => {
        document.getElementsByTagName('body')[0].classList.remove('modal-open');
        document.getElementsByTagName('body')[0].removeAttribute('style');
    }

    return {
        removeDiv,
        addClassOpen,
        removeClassOpen,
    }
}