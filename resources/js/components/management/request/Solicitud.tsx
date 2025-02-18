import React from 'react'

export default function Solicitud() {
  return (
    <>
      <div className="panel-header bg-primary-gradient">
            <div className="page-inner py-5">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="text-white fw-bold mb-3">Control de Gestión</h3>
                        <h6 className="text-white op-7 mb-2">Ingrese correspondencia de <strong>entrada</strong> y/o <strong>salida</strong></h6>
                    </div>                    
                </div>
            </div>
        </div>
        <div className="page-inner mt--5 pt-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card full-height">
                        <div className="card-body">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button type='button' className="nav-link active" data-toggle="tab" id="input-tab" data-bs-toggle="tab" data-bs-target="#input-tab-pane" role="tab" aria-controls="input-tab-pane" aria-selected="true">
                                        <i className="fas fa-arrow-alt-circle-down"></i> Entradas
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button type='button' className="nav-link" data-toggle="tab" id="out-tab" data-bs-toggle="tab" data-bs-target="#out-tab-pane" role="tab" aria-controls="out-tab-pane" aria-selected="false">
                                        <i className="fas fa-arrow-alt-circle-up"></i> Salidas
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="v-pills-with-icon-tabContent">
                                <div className='row'>
                                    <div className='col-sm-12 col-md-6 offset-md-6'>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control input-solid" placeholder="buscar..."/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-primary" type="button">Buscar</button>
                                                </div>
                                                <div className="ml-1">
                                                    <select name="ficha" className="form-control">
                                                        <option value="0"> Todos</option>
                                                        
                                                    </select>
                                                </div>
                                                <div className="ml-2">
                                                   
                                                    <button className="btn btn-success" type="button">
                                                        <span className="btn-label">
                                                            <i className="fa fa-upload"></i>
                                                        </span> Subir                        
                                                    </button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show active" id="input-tab-pane" role="tabpanel" aria-labelledby="input-tab" tabIndex={0}>
                                    <p>Aquí mis entradas.</p>             
                                </div>
                                <div className="tab-pane fade" id="out-tab-pane" role="tabpanel" aria-labelledby="out-tab" tabIndex={1}>
                                    <p>Aquí mis Salidas.</p>
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
