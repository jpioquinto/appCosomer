import React from 'react'

export default function Correspondencia() {
  return (
    <>
      <div className="panel-header bg-primary-gradient">
            <div className="page-inner py-5">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="text-white fw-bold mb-3">Unidad de Correspondencia</h3>
                        <h6 className="text-white op-7 mb-2">Por favor, ingrese la correspondencia</h6>
                    </div>
                    <div className="ms-md-auto py-2 py-md-0">
                        <a href="#" className="btn btn-secondary btn-round">Salir</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="page-inner mt--5 pt-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card full-height">
                        <div className="card-body">
                            <div className='row'>
                                <h1>Correspondencia</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
