import React, {ChangeEvent, MouseEvent, KeyboardEvent, useMemo, useState, useEffect} from 'react'

import { Etapa, Parametro as TypeParametro, ValueCapture, InputType } from '../../../../types/conflicto'
import { formatCurrency, formatDateShort, formatNumeric, baseURL, isNumeric } from '../../../../utils'
import { useConflictStore } from '../../../../store/conflict/conflictStore'
import { useCapture } from '../../../../hooks/useCapture'
import useModal from '../../../../hooks/useModal'
import InputCapture from './InputCapture'

type ParametroProps = {
    parametro: TypeParametro,
    etapaId:Etapa['id'],
    clickParametro:(parametro: TypeParametro, etapaId:Etapa['id']) => void
}

export default function Parametro({parametro, etapaId, clickParametro}: ParametroProps) {
    const {updateCapturaEtapa, finishCapture, setParametro} = useConflictStore()

    const {format, state} = useCapture()

    const {showModal} = useModal()
    
    const [capture, setCaptura] = useState<string|number|(number | string)[]>(parametro.captura?.value!)    

    const showIconDoc = useMemo(() => parametro?.captura?.docs ? parametro.captura.docs.length>0 : false, [parametro.captura?.docs])
    
    const showCapture = useMemo(() => ['CantidadNumerica', 'CantidadEntera', 'Fecha', 'Moneda', 'Afirmacion', 'Texto'].includes(parametro.accion!) && parametro.captura, 
                                [parametro.captura])
    
    const showInputCapture = useMemo(() => ['CantidadNumerica', 'CantidadEntera', 'Fecha', 'Moneda', 'Texto'].includes(parametro.accion!) && parametro.capturando, 
                                [parametro.capturando])

    const showBtnAction = useMemo(() => parametro.multipleCap===1 && capture !== 'N/A', [capture])

    const isArray = useMemo(() => parametro.multipleCap===1 && Array.isArray(capture), [capture])
    
    const inputType  = useMemo(() => {                            
                            let tipo = ['CantidadNumerica', 'CantidadEntera', 'Moneda'].includes(parametro.accion!) ? 'number' : 'text'

                            if (['Fecha'].includes(parametro.accion!)) {
                                tipo = 'date'
                            }

                            return tipo
                        } , [parametro.accion])
    
    const captureFormat = useMemo(() => {//return capture
        if (capture === 'N/A' || !capture) {
            return capture
        }

        let $capture: (number | string)[] = Array.isArray(capture) ? capture : []

        if (parametro.captura?.type==='array') {
            console.log(isArray ? format.applyFormatDateShort($capture).join(',')  : formatDateShort(capture.toString()) )    
        }

        if (['CantidadNumerica', 'CantidadEntera'].includes(parametro.accion!)) {
            return isArray ? format.applyFormatNumeric($capture).join('\t') : formatNumeric(+capture) 
        }   

        if (['Moneda'].includes(parametro.accion!)) {
            return isArray ? format.applyFormatCurrency($capture).join('\t')  : formatCurrency(+capture)
        }

        if (['Fecha'].includes(parametro.accion!)) {
            return isArray ? format.applyFormatDateShort($capture).join(',\t')  : formatDateShort(capture.toString())           
        }

        return capture
    }, [capture])

    const classBabge = useMemo(() => {
        if (capture==='N/A') {
            return 'text-bg-warning'
        }

        if (capture==='NO' && parametro.accion === 'Afirmacion') {
            return 'text-bg-danger'
        }

        return 'text-bg-success'
    }, [capture])

    const getCapture = (): string|number|(number | string)[] => capture

    const updateCapture = (value: string, index:number) => {
        //console.log(value)

        let $capture: (number | string)[]= Array.isArray(capture) ? capture : []

        if (capture && !Array.isArray(capture)) {
            $capture = [(inputType === 'number' && capture !== 'N/A') ? +capture : capture]
        }

        state.updateValueInput(value, index, inputType)

        if (parametro.multipleCap === 1) {
            let dato = (inputType === 'number' && value && value !== 'N/A') ? +value : value 
            
            index < $capture.length
            ? setCaptura($capture.map(($value:string|number, $index: number) => $index===index ? dato : $value))
            : setCaptura([...$capture, dato]);

            (index === $capture.length - 1)
            ? state.setDisabledBtnAdd(inputType === 'number' ? !isNumeric(value) : value.trim() === '')
            : undefined

             return
        }

        setCaptura((inputType === 'number' && value && value !== 'N/A') ? +value : value)
    }
        
    const finish = () => {console.log(getCapture())
        let value = capture || ''

        if (!isArray) {
            value = (inputType === 'number' && value && value !== 'N/A') ? +value : value
            updateCapturaEtapa(
                etapaId, parametro.id,
                {value, type: (value === 'N/A' || inputType === 'text') ? 'string' : inputType} as ValueCapture
            )
        }

        isArray ? updateCapturaEtapa(etapaId, parametro.id, {value: capture, type: 'array'} as ValueCapture) : undefined
        
        finishCapture(etapaId, parametro.id)
    }
    
    const clickRemoveInput = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (state.inputCapture.length > 1) {
            Array.isArray(capture) 
            ? (state.inputCapture.length === capture.length ? setCaptura(capture.filter((value, index) => index !== (capture.length - 1))) : undefined)
            : undefined

            state.setInputCapture( state.inputCapture.filter((input, index) => index !== (state.inputCapture.length - 1)) )
        }
    }

    const clickAddInput = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const inputCapture = [...state.inputCapture, {inputType: inputType, value: ''}]
        state.setDisabledBtnAdd(true)
        state.setInputCapture(inputCapture)
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

    const selectOption = (e: ChangeEvent<HTMLInputElement>) =>{ console.log(e.target?.value.toString())
        setCaptura(e.target?.value.toString())
        state.setInputCapture([])
        //finish()
        updateCapturaEtapa(etapaId, parametro.id, {value: e.target?.value.toString(), type: 'string'} as ValueCapture)        
        finishCapture(etapaId, parametro.id)
    }

    useEffect(() => {
        let $capture: (number | string)[] = Array.isArray(capture) ? capture : []

        if (capture && !Array.isArray(capture)) {
            $capture = [capture.toString()]
        }

        state.setInputCapture(state.getValuesInput($capture, inputType))

        if (isArray) {
            $capture.length > 0 ? state.setDisabledBtnAdd(inputType === 'number' ? !isNumeric($capture[$capture.length - 1].toString()) : $capture[$capture.length - 1].toString().trim() === '') : undefined
        }

        if ($capture.length == 0) {
            state.setInputCapture([...state.inputCapture, {inputType: inputType, value: ''}])
        }

    }, [])

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
            <div className='ps-3 bg-light'>
            <div className="d-inline-flex align-items-end">
                <div className='input-capture'>
                    {state.inputCapture && state.inputCapture.map(($capture, index) => <InputCapture inputType={$capture.inputType} value={$capture.value} index={index} update={updateCapture} endCapture={finish} key={`input-capt-${index}`} />)}
                </div>
                {
                    capture !== 'N/A' && (
                        <button className='btn btn-success btn-xs ms-1 mb-1' onClick={clickFinishCapture}>Aceptar</button>
                    )
                }
                {
                    showBtnAction && (<>
                    <button className={`btn btn-primary btn-xs ms-1 mb-1 ${state.disabledBtnAdd ? 'disabled' : '' }`} onClick={clickAddInput}><i className="fas fa-plus"></i></button>
                    <button className={`btn btn-danger btn-xs ms-1 mb-1 ${state.inputCapture.length > 1 ? '' : 'd-none'}`} onClick={clickRemoveInput}><i className="fas fa-minus"></i></button>
                    </>)
                }
                
            </div>            
            <div className="form-check text-start">
                <input className="form-check-input" type="checkbox" name="afirmacion" id="afirmaNA"  value={'N/A'} checked={capture==='N/A'} onChange={selectOption}/>
                <label className="form-check-label pt-1 fw-semibold" htmlFor="afirmaNA">
                    NO APLICA
                </label>
            </div>  
            {JSON.stringify(state.inputCapture)}                  
            </div>
        )}            
    </>
  )
}
