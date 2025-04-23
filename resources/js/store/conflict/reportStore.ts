import { create } from 'zustand'

import { FilterReport, Registros } from '../../types/conflicto'
import { reportListConflicts } from '../../services/ReportService'

type ReportState = {
    conflicts: Registros,
    listConflicts:(data?: FilterReport) => Promise<void>,
}

export const useReportStore = create<ReportState>((set, get) => ({
    conflicts:[],
    listConflicts: async (data) => {
        const conflicts = await reportListConflicts(data!)
        set({
            conflicts
        })
    }
}))