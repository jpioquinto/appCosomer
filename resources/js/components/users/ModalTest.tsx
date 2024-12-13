import React from 'react'
import useModal from '../../hooks/useModal'
import type { Modal } from '../../types'


export default function ModalTest() {
    
  return (
    <div 
        className={`modal fade`}         
        tabIndex="-1" 
        id="testModal"
        aria-labelledby="testModalLabel" 
        aria-hidden={"true"}       
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="testModalLabel">Nuevo usuario</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Algo aqu....
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
