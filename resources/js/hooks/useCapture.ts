import React, {useState} from "react"

import { formatNumeric, formatCurrency, formatDateShort } from "../utils"
import type { InputType } from "../types/conflicto"

export function useCapture() {
    const [inputCapture, setInputCapture] = useState<InputType[]>([])
    
    const [disabledBtnAdd, setDisabledBtnAdd] = useState<boolean>(false)

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
    
    return {        
        format: {applyFormatNumeric, applyFormatCurrency, applyFormatDateShort},
        state:{inputCapture, setInputCapture, disabledBtnAdd, setDisabledBtnAdd, updateValueInput, getValuesInput}
    }
}