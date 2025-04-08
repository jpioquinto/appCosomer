import { useState } from "react"
import { notificacion } from "../utils"
import { useFileStore } from "../store/conflict/fileStore"
import { Parametro } from "../types/conflicto"

type TypeConfig = {
    limitMB:number,
    bytes:number,
    maxSize:number,
}

const initConfig = {
    limitMB:5,
    bytes:1048576,
    maxSize:5 * 1048576

}
export default function useReadFiles() {    
    const [config, setConfig] = useState<TypeConfig>(initConfig)

    const {total, percent, setCancel, setPercent, setUpload, setSelectedFile, getSelectedFile, getPercent, setTotal, getTotal, getCancel} = useFileStore()    

    let [read, setRead] = useState<number>(0)
    
    let [reading, setReading] = useState<boolean>(false)
    
    const setLimitSize = (size:number) => setConfig({...config, limitMB:size, maxSize: size * config.bytes})

    const setTotalFiles     = (total:number) => setTotal(total)

    const calPercent = ($percent: number) => {
        const $total   = getTotal() == 0 ? 1 : getTotal();

        $percent /= $total; 

        ($percent + getPercent()) > 100 ? setPercent( 100 ) : setPercent( Math.round($percent + getPercent()) )                               
    }

    const setPropertiesRead = () => {
        setSelectedFile({parametroId:0, file:[]})
        setReading(false)
        setPercent(0)
        setCancel(0)
        setTotal(0)
        setRead(0)
    }

    const onError = (e: ProgressEvent<FileReader>) => {        
        switch(e?.target?.error) {
            case e?.target?.error?.NOT_FOUND_ERR:
                notificacion('Archivo no encontrado!', 'error');
            break;
            case e?.target?.error?.NOT_SUPPORTED_ERR:
                notificacion('El archivo no se puede leer, verifique permisos.', 'error');
            break;
            case e?.target?.error?.ABORT_ERR:
                notificacion('Lectura de archivo abortada, verifique permisos.', 'error');
            break; // noop
            default:
                notificacion('A ocurrido un error durante la lectura del archivo, verifique tamaño y/o permisos.', 'error');
            break;
        }
    }

    const onProgress = (e: ProgressEvent<FileReader>) => {        
        if (!e.lengthComputable) {
            return;
        }

        calPercent(Math.round((e.loaded / e.total) * 100))     
    }

    const onLoadStart = (e: ProgressEvent<FileReader>) => setReading(true)

    const onLoadEnd = (e: ProgressEvent<FileReader>) => {
        setRead(++read)        
        if (getTotal() == (read + getCancel())) {
            setTimeout(() => setReading(false), 500)            
        }        
    }

    return { 
        config,
        getSelectedFile,        
        estatus: {percent, read, reading, total},
        reader:{onLoadStart, onProgress, onLoadEnd, onError},
        setPropertiesRead,
        setSelectedFile,
        setTotalFiles,
        setLimitSize,
        setCancel,        
        setUpload
    }
}