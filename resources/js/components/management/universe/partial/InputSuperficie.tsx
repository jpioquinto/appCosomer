import React, {MouseEvent, ChangeEvent, KeyboardEvent, useState} from 'react'

import type { Parametro, ValueCapture, Superficie } from '../../../../types/conflicto'
import { useConflictStore } from '../../../../store/conflict/conflictStore'
import { useSeguimiento } from '../../../../hooks/useSeguimiento'
import { useCapture } from '../../../../hooks/useCapture'
import InfoCaptura from './InfoCaptura'

type CaptureProps = {
    parametro: Parametro
}

export default function InputSuperficie({parametro}: CaptureProps) {
    const {updateCapturaEtapa} = useConflictStore()

    const {MySwal, initCapture} = useSeguimiento()

    const {state} = useCapture()

    const [superficie, setSuperficie] = useState<Superficie>( state.initSuperficie(parametro.captura?.value.toString().split('-') || []) )

    const endCapture = () => {
        updateCapturaEtapa(parametro.etapaId, parametro.id, {value:`${superficie.ha}-${superficie.a}-${superficie.ca}`, type:'string'} as ValueCapture); 
        closeModal();
    }

    const changeInputHa = (e: ChangeEvent<HTMLInputElement>) => {        
        setSuperficie({...superficie, ha: +e.target.value})
    }

    const changeInputA = (e: ChangeEvent<HTMLInputElement>) => {
        setSuperficie({...superficie, a: +e.target.value})
    }

    const changeInputCa = (e: ChangeEvent<HTMLInputElement>) => {
        setSuperficie({...superficie, ca: +e.target.value})
    }

    const closeModal = () => {
        initCapture(parametro.etapaId, parametro.id);
         MySwal.close();
    }

    const clickAccept = (e: MouseEvent<HTMLButtonElement>) => {
        endCapture()
    }

    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            endCapture()
        }
    }
  return (
    <>
    {parametro.capturando && (<>
            <div className='d-flex align-items-center pb-3'>
                <input type='number' placeholder='Hectárea(s)' className={`form-control`} value={superficie.ha} onChange={changeInputHa} onKeyDown={handlerKeyDown}/> - 
                <input type='number' placeholder='Área(s)' className={`form-control`} value={superficie.a} onChange={changeInputA} onKeyDown={handlerKeyDown}/> - 
                <input type='number' placeholder='Centiárea(s)' className={`form-control`} value={superficie.ca} onChange={changeInputCa} onKeyDown={handlerKeyDown}/>
            </div>
            <div className='d-flex justify-content-center'>
                <button type="button" className="btn btn-info btn-sm textl-white fw-semibold" onClick={clickAccept}>Aceptar</button>
                <button type="button" className="btn btn-secondary btn-sm fw-semibold ms-1" onClick={(e: MouseEvent<HTMLButtonElement>) => closeModal()}><i className="fa fa-window-close"></i> Cerrar</button>
            </div>
        </>)
    }
    {!parametro.capturando && (<InfoCaptura parametro={parametro} />)}            
    </>
  )
}
