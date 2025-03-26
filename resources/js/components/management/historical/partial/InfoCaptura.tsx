import React, {MouseEvent} from 'react'

import { useSeguimiento } from '../../../../hooks/useSeguimiento'
import { Parametro } from '../../../../types/conflicto'

type CaptureProps = {
    parametro: Parametro
}

export default function InfoCaptura({parametro}: CaptureProps) {
    const {MySwal} = useSeguimiento();

    const cerrarModal = () => MySwal.close();

    const clickCargarDoc = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cerrarModal();
    }

    const clickEditar = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cerrarModal();
    }

    const clickElimiinar = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cerrarModal();
    }

    const clickCerrarModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cerrarModal();
    }

  return (
    <>
        <div className='container'>
            <p>¿Qué acción desea realizar?</p>
        </div>
        <div className='d-inline-flex justify-content-center'>
            {parametro?.requiereDoc === 1 && (
                <button type="button" className="btn btn-success btn-sm textl-white fw-semibold" onClick={clickCargarDoc}>Cargar documento</button>
            )}
            &nbsp; 
           {parametro?.accion !== 'Afirmacion' && (
                <button type="button" className="btn btn-info btn-sm textl-white fw-semibold" onClick={clickEditar}>Editar la captura</button>
           )}
        &nbsp;   
        <button type="button" className="btn btn-warning btn-sm text-white fw-semibold" onClick={clickElimiinar}>Eliminar la captura</button>&nbsp; 
        <button type="button" className="btn btn-secondary btn-sm fw-semibold" onClick={clickCerrarModal}><i className="fa fa-window-close"></i> Cerrar</button>
        </div>
    </>
  )
}
