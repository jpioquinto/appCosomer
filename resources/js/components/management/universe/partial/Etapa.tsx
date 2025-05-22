import React, { MouseEvent } from 'react';

import type { Parametro as TypeParametro, Etapa as TypeEtapa } from '../../../../types/conflicto'
import Parametros from './Parametros';

type EtapaProps = {
    etapa:TypeEtapa,
    posicion:number,
    clickElement:(etapa:TypeEtapa) => void,
    clickParametro:(param: TypeParametro, etapaId: TypeEtapa['id']) => void,
}

export default function Etapa({etapa, posicion, clickElement, clickParametro}: EtapaProps) {

  return (
    <div className="accordion-item">
        <h2 className="accordion-header">
            <button 
                className={`text-uppercase accordion-button ${etapa.expanded ? '' : 'collapsed'}`} type="button" 
                data-bs-toggle="collapse" aria-expanded={`${etapa.expanded!}`} aria-controls={`etapa-${etapa.id}`} 
                onClick={(e: MouseEvent<HTMLElement>) => {e.stopPropagation(); clickElement(etapa);}}  
                
            >
                <strong>{posicion}.- {etapa.etapa}</strong>
            </button>
        </h2>
        <div id={`etapa-${etapa.id}`} className={`accordion-collapse ${etapa.collapse}`}>
            <div className="accordion-body">
                <div className="alert alert-success" role="alert">
                    {etapa.capturas && <Parametros params={etapa.capturas} etapaId={etapa.id} clickParametro={clickParametro} key={`stage-params-${etapa.id}`} />}
                </div>
            </div>
        </div>
    </div>    
  )
}
