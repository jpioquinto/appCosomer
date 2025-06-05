import { create } from 'zustand'
import { OptionParent } from '../../types'
import type { FilterReport } from '../../types/conflicto'
import { makeHash } from '../../utils'

type FilterState = {
    query:string,
    keyElement:string,
    params:FilterReport,
    entySelected:number[],
    slopeSelected:number[],
    statusSelected:number[],
    optionsMunpiosSelected:OptionParent[],
    setOptionsMunpiosSelected:(optionsMunpiosSelected:OptionParent[]) => void,
    setStatusSelected:(statusSelected:number[]) => void,
    setSlopeSelected:(slopeSelected:number[]) => void,
    setEntySelected:(entySelected:number[]) => void,
    getOptionsMunpiosSelected:() => OptionParent[],
    setKeyElement: (keyElement:string) => void,
    setParams:(params:FilterReport) => void,
    setQuery:(query:string) => void,
    getParams:() => FilterReport,
}
export const useFilterStore = create<FilterState>((set, get) => ({
    optionsMunpiosSelected:[],
    params:{} as FilterReport,
    keyElement:makeHash(6),
    statusSelected:[],
    slopeSelected:[],
    entySelected:[],
    query:'',
    setOptionsMunpiosSelected:(optionsMunpiosSelected) => set({optionsMunpiosSelected}),
    getOptionsMunpiosSelected:() => get().optionsMunpiosSelected,
    setStatusSelected:(statusSelected) => set({statusSelected}),
    setSlopeSelected:(slopeSelected) => set({slopeSelected}),
    setEntySelected:(entySelected) => set({entySelected}),
    setKeyElement:(keyElement) => set({keyElement}),
    setParams:(params) => set({params}),
    setQuery: (query) => set({query}),
    getParams:() => get().params
}))