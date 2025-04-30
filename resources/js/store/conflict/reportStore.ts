import { create } from 'zustand'

import { FilterReport, Registros } from '../../types/conflicto'
import { reportListConflicts } from '../../services/ReportService'
import { makeHash } from '../../utils'

type ReportState = {
    conflicts: Registros,
    keyTable:string,
    url:string|null,
    getUrl:() => string|null,
    setUrl:(url:string|null) => void,
    setKeyTable:(keyTable:string) => void,
    getConflicts:() => Registros,
    listConflicts:(data?: FilterReport) => Promise<void>,
}

export const useReportStore = create<ReportState>((set, get) => ({
    conflicts:[],
    keyTable:makeHash(6),
    url:null,
    getUrl:() => get().url,
    setUrl:(url) => set({url}),
    getConflicts:() => get().conflicts,
    setKeyTable:(keyTable) => set({keyTable}),
    listConflicts: async (data) => {
        const conflicts = await reportListConflicts(data!)
        set({
            conflicts
        })

        get().setKeyTable(makeHash(6))
    }
}))