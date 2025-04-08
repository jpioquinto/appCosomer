import { create } from 'zustand'
import { Parametro, TypeSelectedFile } from '../../types/conflicto'

type FileState = {
    total:number,
    upload:object,
    cancel:number,
    percent:number,
    selectedFile:TypeSelectedFile,
    getSelectedFile:() => TypeSelectedFile,
    setSelectedFile:(selectedFile: TypeSelectedFile) => void,
    setUpload:(parametroId: Parametro['id'], file:File[]) => void,
    setPercent:(percent:number) => void,
    setCancel:(cancel:number) => void,
    setTotal:(total:number) => void,
    getPercent:() =>  number,
    getCancel:() => number,
    getTotal:() => number

}

export const useFileStore = create<FileState>((set, get) =>({ 
    total:0,
    cancel:0,
    percent:0,
    upload:{},
    selectedFile:{parametroId:0, file:[]},
    setSelectedFile:(selectedFile) => set({selectedFile}), 
    getSelectedFile:() => get().selectedFile,
    setPercent: (percent) => set({percent}),
    setCancel:(cancel) => set({cancel}),
    setTotal: (total) => set({total}),
    getPercent:() => get().percent,
    getCancel:() => get().cancel,
    getTotal:() => get().total,
    setUpload:(parametroId, file) => {
        const upload = get().upload
        upload[parametroId] = file
        set({upload})
    }   
}))