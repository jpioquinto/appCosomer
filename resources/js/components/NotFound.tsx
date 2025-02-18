import React from 'react'

export default function NotFound() {
  return (
    <div className="container d-flex justify-content-center align-items-center">
        <div className="page-inner">
            <div className="d-flex flex-column align-items-center">
                <img src="assets/img/undraw/undraw_not_found_60pq.svg" width="250" alt="Page Not Found"/>
                <h2 className="h1 mt-4 mb-4 fw-bold">Página no encontrada.</h2>
                <p className="text-center op-7 mb-5 h5">Lo sentimos la página que intenta consultar no fue encontrada<br/></p>
                <div>
                    <a href="#" className="btn btn-border btn-primary me-3">REGRESAR</a>
                    <a href="#" className="btn btn-primary">IR AL INICIO</a>
                </div>
            </div>
        </div>
    </div>
  )
}
