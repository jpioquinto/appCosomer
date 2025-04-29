import { create } from 'zustand'
import { OptionParent } from '../../types'
import type { FilterReport } from '../../types/conflicto'

type FilterState = {
    params:FilterReport,
    optionsMunpiosSelected:OptionParent[],
    setOptionsMunpiosSelected:(optionsMunpiosSelected:OptionParent[]) => void,
    getOptionsMunpiosSelected:() => OptionParent[],
    setParams:(params:FilterReport) => void,
    getParams:() => FilterReport,
}
export const useFilterStore = create<FilterState>((set, get) => ({
    optionsMunpiosSelected:[],
    params:{} as FilterReport,
    setOptionsMunpiosSelected:(optionsMunpiosSelected) => set({optionsMunpiosSelected}),
    getOptionsMunpiosSelected:() => get().optionsMunpiosSelected,
    setParams:(params) => set({params}),
    getParams:() => get().params
}))