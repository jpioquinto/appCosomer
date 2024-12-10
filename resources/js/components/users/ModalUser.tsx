import React from 'react'

export default function ModalUser() {
  return (
    <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="userModalLabel">Nuevo usuario</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                ...
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary">Crear</button>
            </div>
            </div>
        </div>
    </div>
  )
}
