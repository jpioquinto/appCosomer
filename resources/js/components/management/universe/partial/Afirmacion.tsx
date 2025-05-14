import React, {useState, MouseEvent, ChangeEvent} from 'react'

import { useConflictStore } from '../../../../store/conflict/conflictStore'
import type { Parametro, ValueCapture } from '../../../../types/conflicto'
import { useSeguimiento } from '../../../../hooks/useSeguimiento'
import InfoCaptura from './InfoCaptura'

type CaptureProps = {
    parametro: Parametro
}
export default function Afirmacion({parametro}: CaptureProps) {
    const {MySwal, initCapture} = useSeguimiento();

    const {updateCapturaEtapa} = useConflictStore();

    const [capture, setCaptura] = useState<string>(parametro.captura?.value.toString() || '')

    const selectOption = (e: ChangeEvent<HTMLInputElement>) => setCaptura(e.target?.value.toString())

    const closeModal = () => {
        initCapture(parametro.etapaId, parametro.id);
         MySwal.close();
    }

    const clickAccept = (e: MouseEvent<HTMLButtonElement>) => {
        updateCapturaEtapa(parametro.etapaId, parametro.id, {value:capture, type:'string'} as ValueCapture); 
        closeModal();
    }   

  return (
    <>
    {parametro.capturando && (<>
        <div className='d-flex justify-content-center'>
            <div className="form-check text-start">
                <input className="form-check-input" type="radio" name="afirmacion" id="afirmaSI" value={'SI'} checked={capture==='SI'} onChange={selectOption}/>
                <label className="form-check-label pt-1 fw-semibold" htmlFor="afirmaSI">
                    SI
                </label>
            </div>
            <div className="form-check text-start">
                <input className="form-check-input" type="radio" name="afirmacion" id="afirmaNO"  value={'NO'} checked={capture==='NO'} onChange={selectOption}/>
                <label className="form-check-label pt-1 fw-semibold" htmlFor="afirmaNO">
                    NO
                </label>
            </div>
            <div className="form-check text-start">
                <input className="form-check-input" type="radio" name="afirmacion" id="afirmaNA"  value={'N/A'} checked={capture==='N/A'} onChange={selectOption}/>
                <label className="form-check-label pt-1 fw-semibold" htmlFor="afirmaNA">
                    NO APLICA
                </label>
            </div>
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
