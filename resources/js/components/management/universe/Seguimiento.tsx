import React, {useEffect, useMemo, StrictMode} from 'react'

import type { Etapa as TypeEtapa, Parametro, ValueCapture } from '../../../types/conflicto'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import { useSeguimiento } from '../../../hooks/useSeguimiento'
import ModalEvidencia from '../procedure/ModalEvidencia'
import { tienePermiso, makeHash } from '../../../utils'
import { useModuloStore } from '../../../store/modulo'
import InfoCaptura from './partial/InfoCaptura'
import type { Acciones } from '../../../types'
import useModal from '../../../hooks/useModal'
import Afirmacion from './partial/Afirmacion'
import Etapa from './partial/Etapa'

export default function Seguimiento() {
    const {conflicto, etapas, captura, listStages, updateEtapa, updateCapturaEtapa, initCapture} = useConflictStore()

    const {clickBtnGuardar, MySwal, reset} = useSeguimiento()

    const modulo = useModuloStore(state => state.modulo)

    const {modal, closeModal} = useModal()

    const accionAfirmacion = (parametro:Parametro, etapaId:TypeEtapa['id']) => {
        /*if (!parametro?.captura && parametro?.requiereDoc !== 1) {
            updateCapturaEtapa(etapaId, parametro.id, {value:true, type:'boolean'} as ValueCapture);
            return;
        }*/

        if (!parametro?.captura) {console.log('...aún no capturado...')
            //updateCapturaEtapa(etapaId, parametro.id, {value:true, type:'boolean'} as ValueCapture);            
            initCapture(etapaId, parametro.id);
        }

        MySwal.fire({
            title:"Elija una opción",
            text: `¿Qué acción desea realizar?`,
            icon: "info",
            html:<Afirmacion parametro={parametro}/>,
            showConfirmButton:false,
            allowOutsideClick:false,
            allowEscapeKey:false,
        });
    }

    const accionInput = (parametro:Parametro, etapaId:TypeEtapa['id']) => {
        if (!parametro?.captura) {            
            initCapture(etapaId, parametro.id);
            return;
        }

        MySwal.fire({
            title:"Información capturada",
            text: `¿Qué acción desea realizar?`,
            icon: "warning",
            html:<InfoCaptura parametro={parametro}/>,
            showConfirmButton:false,
            allowOutsideClick:false,
            allowEscapeKey:false,
        });
    }

    const accionParametro = (parametro:Parametro, etapaId:TypeEtapa['id']) => {
        switch(parametro.accion) {
            case 'Afirmacion':                 
                //console.log(parametro)
                accionAfirmacion(parametro, etapaId)              
            break;
            case 'CantidadEntera': case 'CantidadNumerica': case 'Fecha': case 'Moneda':
                accionInput(parametro, etapaId)
            break;
            default:break;
        }
    }

    const clickElement = (etapa:TypeEtapa) => {
        updateEtapa({...etapa, collapse: 'collapsing'})

        setTimeout(() => updateEtapa({...etapa, expanded:!etapa.expanded, collapse:etapa.expanded ? 'collapse' : 'collapse show'}), 100)
    }

    const clickParametro = (parametro:Parametro, etapaId:TypeEtapa['id']) => {
        accionParametro(parametro, etapaId)
    }

    const isEmptyCapture = useMemo(() => Object.keys(captura).length == 0, [captura])

    useEffect(() => {
        reset()
        listStages(conflicto.id)        
    }, [modulo])

  return (
    <>      
        <div className="panel-header bg-primary-gradient">
            <div className="page-inner py-5">
                <div className="d-flex align-items-start align-items-md-start flex-md-row pt-2 pb-4">
                    <div className='flex-fill'>
                        <div className='d-flex justify-content-between'>
                            <h3 className="text-white fw-bold mb-3 text-uppercase">{conflicto.vertiente}</h3>
                            <h3 className="text-white fw-bold mb-3 text-uppercase">NOMBRE DEL PREDIO: {conflicto.predio}</h3>
                            <h3 className="text-white fw-bold mb-3 text-uppercase">ESTATUS: {conflicto.descEstatus}</h3>
                        </div>
                        <h6 className="text-white op-7 mb-2">{conflicto.observaciones}</h6>
                    </div>
                    <div className="ms-md-auto ps-3 py-2 py-md-0">
                        <a href="#" className="btn btn-secondary btn-round">Salir</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="page-inner mt--5 pt-0">
            <div className="row">            
                <div className="col-md-12">
                    <div className="card full-height">
                        {
                            tienePermiso(modulo.acciones as Acciones, 13) && (
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="ml-md-auto mt-2 py-2 py-md-0 pull-right">
                                        <button className="btn btn-primary btn-round me-2" onClick={clickBtnGuardar} disabled={isEmptyCapture}>
                                            <i className="fa fa-save"/> Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>)
                        }
                        <div className="card-body">                        
                            <div className="accordion" id="accordionConflicto">                                
                                {
                                    etapas.map((etapa:TypeEtapa, index: number) => <Etapa etapa={etapa} posicion={index+1} clickElement={clickElement} clickParametro={clickParametro} key={`stage-${etapa.id}`} />)
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>   
        <ModalEvidencia propModal={modal} close={closeModal}/>     
    </>
  )
}
