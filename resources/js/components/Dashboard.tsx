import React, {useEffect} from "react"

import { useLoadingStore } from "../store/loading"
import Loading from './Loading'
import Mapa from "./management/init/Mapa"

export default function Dashboard() {
    const {setIsLoading, loadShow, loadHidden} = useLoadingStore();
    useEffect(() => {
        /*setIsLoading(true)
        loadShow()*/
    }, [])

    return (
        <>
            <div className="panel-header bg-primary-gradient">
                <div className="page-inner py-5">
                    <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                        <div>
                            <h3 className="text-white fw-bold mb-3">Programa de Atención de Conflictos Agrarios (PADCA)</h3>
                            <h6 className="text-white op-7 mb-2">...</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-inner mt--5 pt-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card full-height">
                            <div className="card-body mh-100">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <Mapa />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}