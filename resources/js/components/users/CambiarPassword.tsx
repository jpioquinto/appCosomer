import React, {MouseEvent} from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import useAccionUsuario from '../../hooks/useAccionUsuario'
import { savePasswd } from '../../services/UserService'
import ErrorForm from '../partial/ErrorForm'
import { notificacion } from '../../utils'
import { User } from '../../types'

type PropTypeModal = {
    user:User
}

export default function CambiarPassword({user}:PropTypeModal) {
    const {MySwal} = useAccionUsuario();

    const schema = z.object({
        password: z.string().min(8, {message: 'La contraseña debe contener al menos 8 caracteres.'}),
        confirmPassword: z.string().min(8, {message: 'Este campo debe tener la misma longitud que el campo contraseña.'}),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'La confirmación de la contraseña no coincide.'
    });

    type ValidationSchemaType = z.infer<typeof schema>

    const { register, handleSubmit, setValue , formState: { errors }, watch, reset } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema)
    })

    const registerPasswd = async (data) => {
        const result = await savePasswd({...data, id:user.id});
        
        if (result.response) {
            notificacion(result.message, 'success')
            reset()
            MySwal.close()
        } else {
            notificacion(result.message, 'error')
        }
    }

  return (
    <>  
        <form onSubmit={handleSubmit(registerPasswd)} className="needs-validation">
            <div className="row">
                <div className="col-sm-12">
                    <p className='text-body-emphasis'>{`Se cambiará la contraseña para "${user.nickname}"`}</p>
                    <div className="form-group">
                        <label htmlFor="password">Nueva Contraseña</label>
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
                        <label htmlFor="confirmPassword">Repetir Nueva Contraseña</label>
                        <input type="password" id="confirmPassword" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} required 
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (                                    
                            <ErrorForm>{errors.confirmPassword?.message}</ErrorForm>
                        )}
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" style={{backgroundColor:'rgb(48, 133, 214)'}}>Actualizar</button>&nbsp;&nbsp;
                        <button 
                            type="button" className="btn btn-danger" 
                            style={{backgroundColor:'rgb(221, 51, 51)'}}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => MySwal.close()}
                        >Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}
