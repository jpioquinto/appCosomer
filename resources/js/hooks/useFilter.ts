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

    const [munpiosSelected, setMunpiosSelected] = useState<number[]>([])

    const [statusSelected, setStatusSelected] = useState<number[]>([])

    const [slopeSelected, setSlopeSelected] = useState<string[]>([])    

    const [entySelected, setEntySelected] = useState<number[]>([])
    
    const [query, setQuery] = useState<string>('')
    
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
                !entySelected.includes(actionMeta.option?.value!) ? setEntySelected([...entySelected, actionMeta.option?.value!]) : undefined           
            break
            case 'remove-value':
                removeMunpios(actionMeta.removedValue.value)
                setEntySelected([...entySelected.filter(enty => enty !== actionMeta.removedValue.value)])
            break
            default:break
        }
    }

    const selectMunpio = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {
        switch(actionMeta.action) {
            case 'select-option':                    
                !munpiosSelected.includes(actionMeta.option?.value!) ? setMunpiosSelected([...munpiosSelected, actionMeta.option?.value!]) : undefined           
            break
            case 'remove-value':                
            setMunpiosSelected([...munpiosSelected.filter(munpio => munpio !== actionMeta.removedValue.value)])
            break
            default:break
        }
    }

    const selectSlope = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {
        switch(actionMeta.action) {
            case 'select-option':                    
                !slopeSelected.includes(actionMeta.option?.value.toString()!) ? setSlopeSelected([...slopeSelected, actionMeta.option?.value.toString()!]) : undefined           
            break
            case 'remove-value':                
            setSlopeSelected([...slopeSelected.filter(slope => slope !== actionMeta.removedValue.value.toString())])
            break
            default:break
        }
    }

    const selectStatus = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {
        switch(actionMeta.action) {
            case 'select-option':                    
                !statusSelected.includes(actionMeta.option?.value!) ? setStatusSelected([...statusSelected, actionMeta.option?.value!]) : undefined           
            break
            case 'remove-value':                
            setStatusSelected([...statusSelected.filter(status => status !== actionMeta.removedValue.value)])
            break
            default:break
        }
    }

    const clickConsultar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log(entySelected)
        
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
        events: {selectEnty, selectMunpio, selectSlope, selectStatus, clickConsultar},
        yearConfig:{setInputValue, setValue, handleKeyDown, value, inputValue},
        data: {optionsMunpios},
    }
}