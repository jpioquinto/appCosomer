import React, {ChangeEvent, MouseEvent, KeyboardEvent, useMemo, useState} from 'react'

import { Etapa, Parametro as TypeParametro, ValueCapture } from '../../../types/conflicto'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import { formatCurrency, formatDateShort, formatNumeric } from '../../../utils'

type ParametroProps = {
    parametro: TypeParametro,
    etapaId:Etapa['id'],
    clickParametro:(parametro: TypeParametro, etapaId:Etapa['id']) => void
}

export default function Parametro({parametro, etapaId, clickParametro}: ParametroProps) {
    const {updateCapturaEtapa, finishCapture} = useConflictStore()

    const [capture, setCaptura] = useState<string|number>(parametro.captura?.value.toString() || '')
    
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
