import React, {MouseEvent} from 'react'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { useConflicto } from '../../../hooks/useConflicto'
import { PropsModal } from '../../../types'

type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalCedula({propModal, close}: Modaltype) {
    const {catalog, form, config} = useConflicto();

  return (
    <div
        className={`modal fade ${propModal.clase}`}         
        tabIndex={-1} 
        style={propModal.show ? {display:'block'} : {display:'none'}}  
    >
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="userModalLabel">Cédula de Incorporación</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>

                <form className='needs-validation'>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className="form-group">
                                    <label htmlFor="id-problematica" className='fw-bold'>Marco Jurídico Normativo:</label>
                                    <ReactQuill 
                                        theme="snow" 
                                        modules={config.modules}
                                        formats={config.formats}
                                    />
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className="form-group">
                                    <label htmlFor="id-problematica" className='fw-bold'>Conflicto Jurídico Social:</label>
                                    <ReactQuill 
                                        theme="snow" 
                                        modules={config.modules}
                                        formats={config.formats}
                                    />
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className="form-group">
                                    <label htmlFor="id-problematica" className='fw-bold'>Propuesta de Incorporación:</label>
                                    <ReactQuill 
                                        theme="snow" 
                                        modules={config.modules}
                                        formats={config.formats}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Guardar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}><i className="fa fa-window-close"></i> Cerrar</button>
                    </div>
                </form>                
            </div>
        </div>
    </div>
  )
}
