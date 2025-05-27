import {useEffect, useState, MouseEvent, ChangeEvent, KeyboardEventHandler}  from 'react'
import {MultiValue, ActionMeta} from 'react-select'

import { useEdoStore } from "../store/edoStore"
import { useConflicto } from "./useConflicto"
import type { Option as TypeOption, OptionParent} from "../types"
import { useReportStore } from '../store/conflict/reportStore'
import { useFilterStore } from '../store/conflict/filterStore'
import { FilterReport } from '../types/conflicto'
import { makeHash } from '../utils'

interface OptionAnio {
    readonly label: string,
    readonly value: number,
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

    const {optionsMunpiosSelected, setParams, setOptionsMunpiosSelected, getOptionsMunpiosSelected} = useFilterStore()

    const [statusSelected, setStatusSelected] = useState<number[]>([])

    const [slopeSelected, setSlopeSelected] = useState<number[]>([])    

    const [entySelected, setEntySelected] = useState<number[]>([])
    
    const [query, setQuery] = useState<string>('')
    
    const createOption = (label: string) => ({
        label,
        value: +label,
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

    const getValues = (data: OptionParent[]) => {
        let values:number[] = [];
        data.forEach(item => !values.includes(item.value) ? values = [...values, item.value] : undefined)

        return values
    }

    const removeMunpioSelected = (municipios: OptionParent[]) => { 
        municipios.forEach(municipio => setOptionsMunpiosSelected( getOptionsMunpiosSelected().filter(munpio => munpio.value !== municipio.value) ) )
    }

    const removeMunpios = (edoId:number) => {
        removeMunpioSelected([...optionsMunpios.filter(municipio => municipio.nodo===edoId)])
        
        setOptionsMunpios([...optionsMunpios.filter(municipio => municipio.nodo!==edoId)])
    }

    const selectEnty = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {//console.log(actionMeta)        
        switch(actionMeta.action) {
            case 'select-option':
                listMunpios(+actionMeta.option?.value!)     
                !entySelected.includes(+actionMeta.option?.value!) ? setEntySelected([...entySelected, +actionMeta.option?.value!]) : undefined           
            break
            case 'remove-value':
                removeMunpios(+actionMeta.removedValue.value)
                setEntySelected([...entySelected.filter(enty => enty !== actionMeta.removedValue.value)])
            break
            default:break
        }
    }

    const selectMunpio = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {
        switch(actionMeta.action) {
            case 'select-option':                    
                setOptionsMunpiosSelected([...getOptionsMunpiosSelected().filter(municipio => municipio.value !== actionMeta.option?.value!), actionMeta.option as OptionParent])          
            break
            case 'remove-value':    
                setOptionsMunpiosSelected([...getOptionsMunpiosSelected().filter(municipio => municipio.value !== actionMeta.removedValue.value)])          
            break
            default:break
        }
    }

    const selectSlope = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {
        switch(actionMeta.action) {
            case 'select-option':                    
                !slopeSelected.includes(+actionMeta.option?.value!) ? setSlopeSelected([...slopeSelected, +actionMeta.option?.value!]) : undefined           
            break
            case 'remove-value':                
                setSlopeSelected([...slopeSelected.filter(slope => slope !== actionMeta.removedValue.value)])
            break
            default:break
        }
    }

    const selectStatus = (newValue: MultiValue<TypeOption>, actionMeta: ActionMeta<TypeOption>) => {
        switch(actionMeta.action) {
            case 'select-option':                    
                !statusSelected.includes(+actionMeta.option?.value!) ? setStatusSelected([...statusSelected, +actionMeta.option?.value!]) : undefined           
            break
            case 'remove-value':                
                setStatusSelected([...statusSelected.filter(status => status !== actionMeta.removedValue.value)])
            break
            default:break
        }
    }

    const changeInputCapture = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

    const clickConsultar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        let params = {} as FilterReport

        (entySelected.length > 0  && getOptionsMunpiosSelected().length == 0)
        ? params['entidades'] = entySelected.join(',') : undefined

        getOptionsMunpiosSelected().length > 0
        ? params['munpios'] = getValues(getOptionsMunpiosSelected()).join(',') : undefined

        slopeSelected.length > 0
        ? params['vertiente'] = slopeSelected.join(',') : undefined

        value.length > 0
        ? params['anio'] = getValues(value as OptionParent[]).join(',') : undefined

        statusSelected.length > 0
        ? params['estatus'] = statusSelected.join(',') : undefined

        query.trim() != '' ? params['texto'] = query.trim() : undefined

        //console.log(params)
        setParams(params)
        
        listConflicts(params)
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
        options: {optionsEdos, optionsVertientes, optionsStatus, optionsMunpiosSelected},
        events: {selectEnty, selectMunpio, selectSlope, selectStatus, clickConsultar, changeInputCapture},
        yearConfig:{setInputValue, setValue, handleKeyDown, value, inputValue},
        data: {optionsMunpios},
    }
}