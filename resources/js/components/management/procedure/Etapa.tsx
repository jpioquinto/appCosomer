import React, {MouseEvent, ChangeEvent} from 'react'

import type { Parametros, Parametro, Etapa } from '../../../types/conflicto'
import { useSeguimiento } from '../../../hooks/useSeguimiento'
import { makeHash } from '../../../utils'

type EtapaProps = {
    etapa:Etapa,
    posicion:number,
    clickParametro:(param: Parametro, e: ChangeEvent<HTMLInputElement>) => void,
    clickElement:(etapa:Etapa) => void,
}

export default function Etapa({etapa, posicion, clickElement, clickParametro}: EtapaProps) {

    const generarItems = (params: Parametros) => {
        const listado : JSX.Element[] = []

        params.map(param => {
            listado.push(
                <div className="form-check">
                    <input 
                        className="form-check-input" type="checkbox" value="" id={`param-${param.id}`}
                        checked={param.captura!=null}
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => {/*e.preventDefault();*/ clickParametro(param, etapa.id)} }
                    />
                    <label className="form-check-label" htmlFor={`param-${param.id}`}>
                        {param.parametro}
                    </label>
                </div>
            )
        })

        return listado
    }
    
    const itemsParam = (params: Parametros) => {
        const totalColumn = params.length > 5 ? 2 : 1
        const elemColumn  = Math.round(params.length/2)
        const columnas : JSX.Element[] = []

        totalColumn > 1
        ? columnas.push(<><div className='col-md-6' key={`column-${makeHash(5)}`}>{generarItems(params.slice(0, elemColumn))}</div><div className='col-md-6' key={`column-${makeHash(5)}`}>{generarItems(params.slice(elemColumn, params.length))}</div></>)
        : columnas.push(<div className='col-md-12' key={`column-${makeHash(5)}`}>{generarItems(params)}</div>)

        return columnas
    }

  return (
    <>
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
                    <div className='row' key={`row-${makeHash(4)}`}>                        
                        {                    
                            etapa.capturas && itemsParam(etapa.capturas)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
