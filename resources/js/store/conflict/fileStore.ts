import { create } from 'zustand'
import { Parametro, TypeSelectedFile } from '../../types/conflicto'

type FileState = {
    total:number,
    upload:object,
    cancel:number,
    percent:number,
    loadTotal:number,
    processed:number
    selectedFile:TypeSelectedFile,
    resetUpload:(upload: object) => void,
    getSelectedFile:() => TypeSelectedFile,
    setProcessed:(processed:number) => void,
    setSelectedFile:(selectedFile: TypeSelectedFile) => void,
    setUpload:(parametroId: Parametro['id'], file:File[]) => void,
    setLoadTotal:(loadTotal:number) => void,
    setPercent:(percent:number) => void,
    setCancel:(cancel:number) => void,
    setTotal:(total:number) => void,
    getLoadTotal:() => number,
    getProcessed:() => number,
    getPercent:() =>  number,
    getCancel:() => number,
    getTotal:() => number

}

export const useFileStore = create<FileState>((set, get) =>({ 
    total:0,
    cancel:0,
    percent:0,
    upload:{},
    processed:0,
    loadTotal:0,
    selectedFile:{parametroId:0, file:[]},
    setProcessed:(processed) => set({processed}),    
    resetUpload:(upload) => set({upload}),
    setSelectedFile:(selectedFile) => set({selectedFile}), 
    setLoadTotal:(loadTotal) => set({loadTotal}),
    getSelectedFile:() => get().selectedFile,
    setPercent: (percent) => set({percent}),
    setCancel:(cancel) => set({cancel}),
    getLoadTotal:() => get().loadTotal,
    setTotal: (total) => set({total}),
    getProcessed:() => get().processed,
    getPercent:() => get().percent,
    getCancel:() => get().cancel,
    getTotal:() => get().total,
    setUpload:(parametroId, file) => {
        let upload = get().upload        
        upload = {...upload, [parametroId]:file}
        
        set({upload})
    }   
}))