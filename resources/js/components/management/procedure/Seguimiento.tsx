import React from 'react'

import { useConflictStore } from '../../../store/conflict/conflictStore'

export default function Seguimiento() {
    const conflicto = useConflictStore(state => state.conflicto)
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
                        <h6 className="text-white op-7 mb-2">{conflicto.sintEstatus}</h6>
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
                        <div className="card-body">

                            <div className="accordion" id="accordionConflicto">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            #1 RECEPCIÓN DE EXPEDIENTE INTEGRADO
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            #2 AUTORIZACIÓN DE INCLUSIÓN AL UNIVERSO DE TRABAJO
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            #3 TRABAJOS TÉNICOS
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
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
