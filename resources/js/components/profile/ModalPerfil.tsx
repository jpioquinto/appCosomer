import React, {MouseEvent, ChangeEvent, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorForm from '../partial/ErrorForm'
import type { PropsModal } from '../../types'

type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalPerfil({propModal, close}: Modaltype) {
    const schema = z.object({
        nombre: z.string().min(6, {message: 'Ingrese un nombre valido para el perfil de usuario.'}),
        descripcion: z.string().min(8, {message: 'Capture una descripción para el perfil.'}),
    })
    
    type ValidationSchemaType = z.infer<typeof schema>

    const { register, handleSubmit, setValue , formState: { errors }, watch, reset } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema)
    })

    const registerPerfil = () => {

    }

  return (
    <div 
        className={`modal fade ${propModal.clase}`}         
        tabIndex={-1} 
        aria-labelledby="urModalLabel" 
        aria-modal={propModal.show ? "true" : undefined}     
        style={propModal.show ? {display:'block'} : {display:'none'}}     
    >
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="urModalLabel">{'Nuevo Perfil'}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>
                <form onSubmit={handleSubmit(registerPerfil)} className="needs-validation">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-5">
                                <div className="form-group">
                                    <label htmlFor="id-input-nombre">Nombre</label>
                                    <input 
                                        type="text" id="id-input-nombre" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} required                                        
                                        {...register('nombre')}                                        
                                    />
                                    {errors.nombre && (                                    
                                        <ErrorForm>{errors.nombre?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="form-group">
                                    <label htmlFor="id-input-desc">Descripción</label>
                                    <input 
                                        type="text" id="id-input-desc" className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} required                                        
                                        {...register('descripcion')}
                                    />
                                    {errors.descripcion && (                                    
                                        <ErrorForm>{errors.descripcion?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> {'Crear'}</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}><i className="fa fa-window-close"></i> Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
