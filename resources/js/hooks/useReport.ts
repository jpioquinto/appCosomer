import {useMemo, MouseEvent} from 'react'

import { useReportStore } from '../store/conflict/reportStore'
import { useFilterStore } from '../store/conflict/filterStore'
import { downloadReport } from '../services/ReportService'
import { useEdoStore } from '../store/edoStore'
import { useConflicto } from './useConflicto'
import React from 'react'
import { notificacion } from '../utils'

export function useReport() {
    const {conflicts, keyTable, url, setUrl, getConflicts} = useReportStore()

    const {listEdos, getEdos}     = useEdoStore()

    const {getParams} = useFilterStore()

    const {catalog} = useConflicto()

    const loadCatalog = () => {
        getEdos().length == 0 ? listEdos() : undefined
        catalog.getVertientes().length == 0 ? catalog.listVertientes() : undefined
        catalog.getEstatus().length    == 0 ? catalog.listEstatus()    : undefined
    }

    const isEmpty = useMemo(() => getConflicts().length == 0, [conflicts])

    const generateLink = (report: string) => {
        const elem = document.getElementById("reportExcel");
        if (elem) {
            elem.remove();
        }

        var fileLink = document.createElement('a');

        fileLink.href = url!;
        fileLink.setAttribute('download', report);
        fileLink.setAttribute('target', '_blank');
        fileLink.setAttribute('id', 'reportExcel');

        document.body.appendChild(fileLink);

        fileLink.click();
    }

    const getReport = async () => {
        const result = await downloadReport(getParams())
        if (result.solicitud) {
            setUrl(result.report)
            generateLink(result.name)
            notificacion(result.message, 'success')
        } else {
            notificacion(result.message, 'error')
        }
    }

    const clickDescargar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        getReport()
    }

    return {keyTable, isEmpty, url, loadCatalog, getConflicts, clickDescargar}
}