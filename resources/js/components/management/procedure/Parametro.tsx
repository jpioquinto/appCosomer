import React, {ChangeEvent, MouseEvent, KeyboardEvent, useMemo, useState} from 'react'

import { Etapa, Parametro as TypeParametro, ValueCapture } from '../../../types/conflicto'
import { formatCurrency, formatDateShort, formatNumeric } from '../../../utils'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import useModal from '../../../hooks/useModal'

type ParametroProps = {
    parametro: TypeParametro,
    etapaId:Etapa['id'],
    clickParametro:(parametro: TypeParametro, etapaId:Etapa['id']) => void
}

export default function Parametro({parametro, etapaId, clickParametro}: ParametroProps) {
    const {updateCapturaEtapa, finishCapture, setParametro} = useConflictStore()

    const {showModal} = useModal()

    const [capture, setCaptura] = useState<string|number>(parametro.captura?.value.toString() || '')

    const showIconDoc = useMemo(() => parametro?.captura?.docs ? parametro.captura.docs.length>0 : false, [parametro.captura?.docs])
    
    const showCapture = useMemo(() => ['CantidadNumerica', 'CantidadEntera', 'Fecha', 'Moneda'].includes(parametro.accion!) && parametro.captura, 
                                [parametro.captura])
    
    const showInputCapture = useMemo(() => ['CantidadNumerica', 'CantidadEntera', 'Fecha', 'Moneda'].includes(parametro.accion!) && parametro.capturando, 
                                [parametro.capturando])
    
    const inputType  = useMemo(() => {                            
                            let tipo = ['CantidadNumerica', 'CantidadEntera', 'Moneda'].includes(parametro.accion!) ? 'number' : 'text'

                            if (['Fecha'].includes(parametro.accion!)) {
                                tipo = 'date'
                            }
                            
                            return tipo
                        } , [parametro.accion])
    
    const captureFormat = useMemo(() => {
        if (['CantidadNumerica', 'CantidadEntera'].includes(parametro.accion!)) {
            return capture ? formatNumeric(+capture) : capture
        }   

        if (['Moneda'].includes(parametro.accion!)) {
            return formatCurrency(+capture)
        }

        if (['Fecha'].includes(parametro.accion!)) {
            return capture ? formatDateShort(capture.toString()) : capture
        }

        return capture
    }, [capture])
        
    const finish = () => {
        let value = capture || ''
        value = inputType === 'number' && value ? +value : value
        updateCapturaEtapa(etapaId, parametro.id, {value: inputType !== 'number' ? capture : +capture, type: inputType !== 'number' ? 'string' : 'numeric'} as ValueCapture);
        finishCapture(etapaId, parametro.id)
    }

    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            finish()
        }
    }

    const changeInputCapture = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()      
        setCaptura(e.target.value)
    }

    const clickFinishCapture = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        finish()
    }

    const clickIconPDF = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setParametro(parametro)
        showModal()
    }

  return (
    <>
      <div className="form-check">
            <input 
                className="form-check-input" type="checkbox" value="" id={`param-${parametro.id}`}
                checked={parametro.captura!=null}
                onChange={ (e: ChangeEvent<HTMLInputElement>) => { clickParametro(parametro, etapaId) } }
            />
            <label className="form-check-label" htmlFor={`param-${parametro.id}`}>
                {parametro.parametro}
            </label>
            {showCapture && (
                <span className="badge text-bg-success">{captureFormat}</span>
            )}
            {showIconDoc && (
                <button className="btn btn-default btn-xs" onClick={clickIconPDF}>
                    <img src={`${import.meta.env.VITE_APP_URL}/assets/images/icons/svg/file_pdf.svg`} style={{width:'24px', height:'24px'}}/>
                </button>
            )}
        </div>
        {showInputCapture && (
            <div className="d-inline-flex">
                <input type={inputType} className='form-control' value={capture} autoFocus onChange={changeInputCapture} onKeyDown={handlerKeyDown} />
                <button className='btn btn-success btn-xs ms-1' onClick={clickFinishCapture}>Aceptar</button>
            </div>
        )}
    </>
  )
}
