import { useState } from "react"
import { notificacion } from "../utils"

type TypeEstatus = {
    read:number,
    total:number,
    reading:boolean,
    percentRead:number,
}

type TypeConfig = {
    limitMB:number,
    bytes:number,
    maxSize:number,
}

const initEstatus = {
    read:0,
    total:0,
    reading:false,
    percentRead:0,
}

const initConfig = {
    limitMB:5,
    bytes:1048576,
    maxSize:5 * 1048576

}
export default function useReadFiles() {
    //const [estatus, setEstatus] = useState<TypeEstatus>(initEstatus)

    const [config, setConfig] = useState<TypeConfig>(initConfig)
    
    let [total, setTotal] = useState<number>(0)

    let [read, setRead] = useState<number>(0)

    let [percent, setPercent] = useState<number>(0)

    const [reading, setReading] = useState<boolean>(false)
    
    const setLimitSize = (size:number) => setConfig({...config, limitMB:size, maxSize: size * config.bytes})

    const setTotalFiles     = (total:number) => setTotal(total)

    const setReadFiles = () => {
        setReading(false)
        setPercent(0)
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

        const $total   = total == 0 ? 1 : total;

        const $percent = Math.round((e.loaded / e.total) * 100) / $total; 

        if (($percent + percent) <= 100) {console.log(total)
            const porc = $percent + percent
            setPercent( porc )
        }        
    }

    const onLoadStart = (e: ProgressEvent<FileReader>) => setReading(true)

    const onLoadEnd = (e: ProgressEvent<FileReader>) => {
        setRead(++read)

        if (total == read) {
            
            //setEstatus({...estatus, reading:false})
        }
    }

    return { 
        config,
        estatus: {percent, read, reading, total},
        setReadFiles,
        setTotalFiles,
        setLimitSize,
        onError,
        onProgress,
        onLoadStart,
        onLoadEnd 
    }
}