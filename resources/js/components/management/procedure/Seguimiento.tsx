import React from 'react'

export default function Seguimiento() {
  return (
    <>      
        <div className="page-inner page-inner-fill">
            <div className="page-with-aside mail-wrapper bg-white">
                <div className="page-aside">
                    <div className="aside-header">
                        <div className="title">Seguimiento</div>
                        <div className="description">Documentación del Trámite</div>
                        <a className="btn btn-primary toggle-email-nav" data-bs-toggle="collapse" href="#email-app-nav" role="button" aria-expanded="false" aria-controls="email-nav">
                            <i className="icon-menu me-2"></i>
                            Menu
                        </a>
                    </div>
                    <div className="aside-nav collapse" id="email-app-nav">
                        <ul className="nav">
                            <li className="active">
                                <a href="#">
                                    <i className="fas fa-clipboard-list"></i> Diagnóstico
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-file-alt"></i> Cédula de incorporación
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-folder-open"></i> Validación
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fas fa-tags"></i> Firmas
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="page-content mail-content">
                    <div className="inbox-head d-lg-flex d-block">
                        <h3>Folio MX-CHP-0005</h3>
                    </div>
                    <div className="inbox-body">

                    </div>
                </div>

            </div>
        </div>        
    </>
  )
}
