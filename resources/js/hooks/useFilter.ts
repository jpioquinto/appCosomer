import {useEffect, useState, MouseEvent, KeyboardEventHandler}  from 'react'
import {MultiValue, ActionMeta} from 'react-select'

import { useEdoStore } from "../store/edoStore"
import { useConflicto } from "./useConflicto"
import type { Option as TypeOption, OptionParent} from "../types"
import { useReportStore } from '../store/conflict/reportStore'

interface OptionAnio {
    readonly label: string,
    readonly value: string,
}

export function useFilter() {    
    const [optionsVertientes, setOptionsVertientes] = useState<TypeOption[]>([])

    const [optionsMunpios, setOptionsMunpios] = useState<OptionParent[]>([])
        
    const [optionsStatus, setOptionsStatus] = useState<TypeOption[]>([])

    const [optionsEdos, setOptionsEdos] = useState<TypeOption[]>([])

    const [value, setValue] = useState<readonly OptionAnio[]>([])

    const {currentMnpios, getEdos, listMunpios} = useEdoStore()

    const [inputValue, setInputValue] = useState('')

    const {listConflicts} = useReportStore() 

    const {catalog} = useConflicto() 
    
    const createOption = (label: string) => ({
        label,
        value: label,
    })

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    }
    
    const generateOptionEdos = () => {
        let $options: TypeOption[] = []
        getEdos().forEach((entidad) => {
            $options.push({value: entidad.id, label: entidad.estado})
        })

        return $options
    }

    const generateOptionVertientes = () => {
        let $options: TypeOption[] = []
        catalog.getVertientes().forEach((vertiente) => {
            $options.push({value: vertiente.id, label: vertiente.acronimo!})
        })

        return $options
    }

    const generateOptionStatus = () => {
        let $options: TypeOption[] = []
        catalog.getEstatus().forEach((status) => {
            $options.push({value: status.id, label: status.descripcion})
        })

        return $options
    }

    const generateOptionMunpios = () => {
        let $options: OptionParent[] = []
        currentMnpios.forEach((municipio) => {
            $options.push({value: municipio.id, label: municipio.municipio, nodo:municipio.estado_id})
        })
        return $options
    }

    const removeMunpios = (edoId:number) => {
        setOptionsMunpios([...optionsMunpios.filter(municipio => municipio.nodo!==edoId)])
    }


    const selectEnty = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {//console.log(actionMeta)
        
        switch(actionMeta.action) {
            case 'select-option':
                listMunpios(actionMeta.option?.value!)
            break
            case 'remove-value':
                removeMunpios(actionMeta.removedValue.value)
            break
            default:break
        }
    }

    const clickConsultar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log(optionsEdos)
        console.log(optionsMunpios)
        console.log(optionsVertientes)
        console.log(value)
        console.log(optionsStatus)
        //listConflicts()
    }

    useEffect(() => {
        setOptionsEdos(generateOptionEdos())
        setOptionsStatus(generateOptionStatus())    
        setOptionsVertientes(generateOptionVertientes())    
    }, [])

    useEffect(() => {
        const $listMunpios = [...optionsMunpios, ...generateOptionMunpios()]
        setOptionsMunpios($listMunpios)
    } , [currentMnpios]) 

    return {
        options: {optionsEdos, optionsVertientes, optionsStatus},
        events: {selectEnty, clickConsultar},
        data: {optionsMunpios},
        yearConfig:{setInputValue, setValue, handleKeyDown, value, inputValue}
    }
}