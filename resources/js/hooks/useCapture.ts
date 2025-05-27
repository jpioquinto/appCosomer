import React, {useState, useEffect} from "react"

import type { InputType, Superficie, ValueCapture } from "../types/conflicto"
import { formatNumeric, formatCurrency, formatDateShort } from "../utils"
import { useConflicto } from "./useConflicto"
import type { Option } from "../types"
import { isNumeric } from "../utils"

export function useCapture() {
    const [optionsValuadores, setOptionsValuadores] = useState<Option[]>([])

    const [inputCapture, setInputCapture] = useState<InputType[]>([])
    
    const [disabledBtnAdd, setDisabledBtnAdd] = useState<boolean>(false)

    const {catalog} = useConflicto()

    const generateOptionsValuadores = () => {
        let $options: Option[] = []
        catalog.getValuadores().forEach((value) => {
            $options.push({value: value.acronimo, label: value.acronimo!})
        })

        return $options
    }

    const updateValueInput = (value: string, index:number, inputType:string = 'text') => {
        const updateInput = inputCapture.map(($value:InputType, $index: number) => {
            if ($index === index) {
                $value.value = inputType === 'number' && value ? +value : value
            }
            
            return $value
        })

        setInputCapture(updateInput)
    }

    const getValuesInput = ($capture: (number | string)[], inputType: string): InputType[] => {
        let $inputCapture: InputType[] = []
        
        $capture.forEach(value => {
            $inputCapture = [...$inputCapture, {inputType: inputType, value}]            
        })

        return $inputCapture
    }

    const applyFormatNumeric = ($capture: (number | string)[]): string[] => {        
        let listado: string[] = []
        $capture.forEach($value => listado = [...listado, formatNumeric(+$value)])

        return listado
    }

    const applyFormatCurrency = ($capture: (number | string)[]): string[] => {
        let listado: string[] = []
        $capture.forEach($value => listado = [...listado, formatCurrency(+$value)])

        return listado
    }

    const applyFormatDateShort = ($capture: (number | string)[]): string[] => {
        let listado: string[] = []
        $capture.forEach($value => listado = [...listado, formatDateShort($value.toString())])

        return listado
    }

    const initSuperficie = (capture: string[]): Superficie => {
        return {
            ha:capture[0] ? +capture[0] : 0,
            a:capture[1]  ? +capture[1] : 0,
            ca:capture[2] ? +capture[2] : 0
        }        
    }

    const initValueCapture = (value: string|number|undefined): string|number|undefined => {
        if (!value) {
            return;
        }

        return isNumeric(value.toString()) ? +value : value.toString()
    }

    
    useEffect(() => {
        setOptionsValuadores(generateOptionsValuadores())
    }, [])
    
    return {        
        options:{optionsValuadores},
        format: {applyFormatNumeric, applyFormatCurrency, applyFormatDateShort},
        state:{inputCapture, setInputCapture, disabledBtnAdd, setDisabledBtnAdd, updateValueInput, getValuesInput, initSuperficie, initValueCapture}
    }
}