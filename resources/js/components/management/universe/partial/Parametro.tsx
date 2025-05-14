import React, {ChangeEvent, MouseEvent, KeyboardEvent, useMemo, useState, useEffect} from 'react'

import { Etapa, Parametro as TypeParametro, ValueCapture } from '../../../../types/conflicto'
import { formatCurrency, formatDateShort, formatNumeric, baseURL } from '../../../../utils'
import { useConflictStore } from '../../../../store/conflict/conflictStore'
import useModal from '../../../../hooks/useModal'

type ParametroProps = {
    parametro: TypeParametro,
    etapaId:Etapa['id'],
    clickParametro:(parametro: TypeParametro, etapaId:Etapa['id']) => void
}

export default function Parametro({parametro, etapaId, clickParametro}: ParametroProps) {
    const {updateCapturaEtapa, finishCapture, setParametro} = useConflictStore()

    const {showModal} = useModal()
    //useEffect(() => console.log(parametro.captura), [])
    const [capture, setCaptura] = useState<string|number|string[]|number[]>(parametro.captura?.value!)

    const showIconDoc = useMemo(() => parametro?.captura?.docs ? parametro.captura.docs.length>0 : false, [parametro.captura?.docs])
    
    const showCapture = useMemo(() => ['CantidadNumerica', 'CantidadEntera', 'Fecha', 'Moneda', 'Afirmacion', 'Texto'].includes(parametro.accion!) && parametro.captura, 
                                [parametro.captura])
    
    const showInputCapture = useMemo(() => ['CantidadNumerica', 'CantidadEntera', 'Fecha', 'Moneda', 'Texto'].includes(parametro.accion!) && parametro.capturando, 
                                [parametro.capturando])

    const applyFormatNumeric = ($capture: string[]|number[]): string[] => {        
        let listado: string[] = []
        $capture.forEach($value => listado = [...listado, formatNumeric(+$value)])

        return listado
    }

    const applyFormatCurrency = ($capture: string[]|number[]): string[] => {
        let listado: string[] = []
        $capture.forEach($value => listado = [...listado, formatCurrency(+$value)])

        return listado
    }

    const applyFormatDateShort = ($capture: string[]|number[]): string[] => {
        let listado: string[] = []
        $capture.forEach($value => listado = [...listado, formatDateShort($value.toString())])

        return listado
    }
    
    const isArray = useMemo(() => parametro.multipleCap===1 && Array.isArray(capture), [capture])
    
    const inputType  = useMemo(() => {                            
                            let tipo = ['CantidadNumerica', 'CantidadEntera', 'Moneda'].includes(parametro.accion!) ? 'number' : 'string'

                            if (['Fecha'].includes(parametro.accion!)) {
                                tipo = 'date'
                            }

                            if (parametro.multipleCap === 1) {
                                return 'array'
                            }
                            
                            return tipo
                        } , [parametro.accion])
    
    const captureFormat = useMemo(() => {//return capture
        if (capture === 'N/A' || !capture) {
            return capture
        }

        let $capture: string[]|number[] = Array.isArray(capture) ? capture : []

        if (parametro.captura?.type==='array') {
            console.log(isArray ? applyFormatDateShort($capture).join(',')  : formatDateShort(capture.toString()) )    
        }

        if (['CantidadNumerica', 'CantidadEntera'].includes(parametro.accion!)) {
            return isArray ? applyFormatNumeric($capture).join('\t') : formatNumeric(+capture) 
        }   

        if (['Moneda'].includes(parametro.accion!)) {
            return isArray ? applyFormatCurrency($capture).join('\t')  : formatCurrency(+capture)
        }

        if (['Fecha'].includes(parametro.accion!)) {
            return isArray ? applyFormatDateShort($capture).join(',\t')  : formatDateShort(capture.toString())           
        }

        return capture
    }, [capture])

    const classBabge = useMemo(() => {
        if (capture==='N/A') {
            return 'text-bg-warning'
        }

        if (capture==='No' && parametro.accion === 'Afirmacion') {
            return 'text-bg-danger'
        }

        return 'text-bg-success'
    }, [capture])
        
    const finish = () => {
        let value = capture || ''
        value = inputType === 'number' && value ? +value : value
        updateCapturaEtapa(etapaId, parametro.id, {value: inputType !== 'number' ? capture : +capture, type: inputType} as ValueCapture);
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

    const selectOption = (e: ChangeEvent<HTMLInputElement>) =>{ 
        setCaptura(e.target?.value.toString())
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
                <span className={`badge ${classBabge}`}>{captureFormat}</span>
            )}
            {showIconDoc && (
                <button className="btn btn-default btn-xs" onClick={clickIconPDF}>
                    <img src={`${baseURL()}/assets/images/icons/svg/file_pdf.svg`} style={{width:'24px', height:'24px'}}/>
                </button>
            )}
        </div>
        {showInputCapture && (
            <>
            <div className="d-inline-flex">
                <input type={inputType} className='form-control' value={capture.toString()} autoFocus onChange={changeInputCapture} onKeyDown={handlerKeyDown} />
                <button className='btn btn-success btn-xs ms-1' onClick={clickFinishCapture}>Aceptar</button>
            </div>            
            <div className="form-check text-start">
                <input className="form-check-input" type="checkbox" name="afirmacion" id="afirmaNA"  value={'N/A'} checked={capture==='N/A'} onChange={selectOption}/>
                <label className="form-check-label pt-1 fw-semibold" htmlFor="afirmaNA">
                    NO APLICA
                </label>
            </div>            
            </>
        )}
    </>
  )
}
