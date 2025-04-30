import { create } from 'zustand'
import { OptionParent } from '../../types'
import type { FilterReport } from '../../types/conflicto'
import { makeHash } from '../../utils'

type FilterState = {
    params:FilterReport,
    keyElement:string,
    optionsMunpiosSelected:OptionParent[],
    setKeyElement: (keyElement:string) => void,
    setOptionsMunpiosSelected:(optionsMunpiosSelected:OptionParent[]) => void,
    getOptionsMunpiosSelected:() => OptionParent[],
    setParams:(params:FilterReport) => void,
    getParams:() => FilterReport,
}
export const useFilterStore = create<FilterState>((set, get) => ({
    optionsMunpiosSelected:[],
    params:{} as FilterReport,
    keyElement:makeHash(6),
    setOptionsMunpiosSelected:(optionsMunpiosSelected) => set({optionsMunpiosSelected}),
    getOptionsMunpiosSelected:() => get().optionsMunpiosSelected,
    setKeyElement:(keyElement) => set({keyElement}),
    setParams:(params) => set({params}),
    getParams:() => get().params
}))