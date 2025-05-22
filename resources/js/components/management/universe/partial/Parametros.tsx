import React, {useMemo} from 'react'

import type { Parametros, Parametro as TypeParametro, Etapa as TypeEtapa } from '../../../../types/conflicto'
import Parametro from './Parametro'

type ParamsProps = {    
    params:Parametros,
    etapaId:TypeEtapa['id'],
    clickParametro:(param: TypeParametro, etapaId: TypeEtapa['id']) => void,
}
export default function Parametros({params, etapaId, clickParametro}: ParamsProps) {
    const totalColumn = useMemo(() => params.length > 5 ? 2 : 1,[params])
    const elemColumn  = useMemo(() => Math.round(params.length/2), [params])

  return (
    <div className='row'>
      {
        totalColumn>1 
        ? (<>
                <div className='col-md-6'>{params.slice(0, elemColumn).map(param => <Parametro parametro={param} etapaId={etapaId} clickParametro={clickParametro} key={param.keyParam}/>)}</div>
                <div className='col-md-6'>{params.slice(elemColumn, params.length).map(param => <Parametro parametro={param} etapaId={etapaId} clickParametro={clickParametro} key={param.keyParam}/>)}</div>
            </>) 
        : (<div className='col-md-12'>{params.map(param => <Parametro parametro={param} etapaId={etapaId} clickParametro={clickParametro} key={param.keyParam}/>)}</div>)
      }
    </div>
  )
}
