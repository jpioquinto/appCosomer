import React, {MouseEvent, useState } from 'react'
import type { PropsModal } from '../../types'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorForm from '../partial/ErrorForm'
import {saveUser} from '../../services/UserService'
import useModal from '../../hooks/useModal'
import {notificacion} from '../../utils'

type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}
export default function ModalUser({propModal, close}: Modaltype) {
    const {hideModal} = useModal()
    
    const schema = z.object({
        username: z.string().min(6, {message: 'El usuario debe contener al menos 6 caracteres.'}).refine(
            (value) => value !== 'jesus.pioquinto', 'Este usuario ya existe.'
        ),
        password: z.string().min(8, {message: 'La contraseña debe contener al menos 8 caracteres.'}),
        confirmPassword: z.string().min(8, {message: 'Este campo debe tener la misma longitud que el campo contraseña.'}),
        perfil: z.coerce.number({
            required_error: "Seleccione el perfil para el usuario.",
            invalid_type_error: "No se recibió el identificador del perfil."            
        }).int().min(1, {message:"No se recibió el identificador del perfil."})
      }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'La confirmación de la contraseña no coincide.'
      });

    type ValidationSchemaType = z.infer<typeof schema>

    const { register, handleSubmit, setValue , formState: { errors }, watch, reset } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema)
    })

    const [user, setUer] = useState('')

    const registerUser = async (data) => {
        const result = await saveUser(data);
        
        if (result.response) {
            hideModal()
            notificacion(result.message, 'success')
            reset()
        } else {
            notificacion(result.message, 'error')
        }
    }

  return (
    <div 
        className={`modal fade ${propModal.clase}`}         
        tabIndex="-1" 
        aria-labelledby="userModalLabel" 
        aria-hidden={propModal.show ? "false" : "true"}     
        aria-modal={propModal.show ? "true" : undefined}     
        style={propModal.show ? {display:'block'} : {display:'none'}}     
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="userModalLabel">Nuevo usuario</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>
                <form onSubmit={handleSubmit(registerUser)} className="needs-validation">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="usuario">Usuario</label>
                                    <input 
                                        type="text" id="usuario" className={`form-control ${errors.usuario ? 'is-invalid' : ''}`} placeholder="Eje. juan.perez" required                                        
                                        {...register('username')}
                                    />
                                    {errors.usuario && (                                    
                                        <ErrorForm>{errors.username?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input type="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} required
                                        {...register('password')}                                    
                                    />
                                    {errors.password && (                                    
                                        <ErrorForm>{errors.password?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Repetir contraseña</label>
                                    <input type="password" id="confirmPassword" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} required 
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword && (                                    
                                        <ErrorForm>{errors.confirmPassword?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="perfil">Perfil</label>
                                    <select id="perfil" className={`form-control ${errors.perfil ? 'is-invalid' : ''}`}
                                        {...register('perfil', {
                                            required: 'El Nombre del paciente es obligatorio'
                                        })}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="1">Super usuario</option>
                                    </select>
                                    {errors.perfil && (                                    
                                        <ErrorForm>{errors.perfil?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}><i className="fa fa-window-close"></i> Cerrar</button>
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Crear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
