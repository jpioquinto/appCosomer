import React, {MouseEvent, useEffect} from 'react'

import type { DraftRegModulo } from '../../schema/modulo-schema'
import type { PropsModal } from '../../types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RegistroModulo } from '../../schema/modulo-schema'
import { saveModulo } from '../../services/ModuloService'
import { useModuloStore } from '../../store/modulo'
import ErrorForm from '../partial/ErrorForm'
import useModal from '../../hooks/useModal'
import { notificacion } from '../../utils'

type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalModulo({propModal, close}: Modaltype) {
  const {hideModal} = useModal();

  const {registro, updateModulo, addModulo} = useModuloStore();

  const schema = z.object({
          nombre: z.string().min(4, {message: 'El nombre del módulo debe contener al menos 4 caracteres.'}),
          controlador: z.optional(z.string()).nullable(),
          icono: z.optional(z.string()).nullable(),
          clase: z.optional(z.string()).nullable(),
          orden: z.coerce.number({
              required_error: "Capture el orden, debe ser un entero mayor o igual a 0.",
              invalid_type_error: "Debe capturar un dato numérico."            
          }).int().min(0, {message:"Debe capturar un dato numérico mayor o igual a 0."}),
          nodo_padre: z.coerce.number({
              required_error: "Capture el orden, debe ser un entero mayor o igual a 0.",
              invalid_type_error: "Debe capturar un dato numérico."            
          }).int().min(0, {message:"Debe capturar un dato numérico mayor o igual a 0."}),
          acciones: z.optional(z.string()).nullable(),
          descripcion: z.optional(z.string()).nullable(),
          ruta: z.optional(z.string()).nullable(),
          grupo: z.coerce.number({
              required_error: "Capture el grupo al que pertenece el módulo, debe ser un entero mayor o igual a 0.",
              invalid_type_error: "Debe capturar un dato numérico."            
          }).int().min(0, {message:"Debe capturar un dato numérico mayor o igual a 0."})
        });

    type ValidationSchemaType = z.infer<typeof schema>
    
    const { register, handleSubmit, setValue , formState: { errors }, reset } = useForm<ValidationSchemaType>({
            resolver: zodResolver(schema)
        })
    
    const processResult = response => {
        const result = RegistroModulo.safeParse(response)
        if (result.success) {
            registro?.id ? updateModulo(result.data) : addModulo(result.data) 
        }             
    }

    const registerModulo = async (data: DraftRegModulo) => {
        const result = await saveModulo(data, (registro?.id ? registro.id : undefined));
        
        if (result.solicitud) {
            processResult(result.modulo)         
            hideModal()
            notificacion(result.message, 'success')
            reset()
        } else {
            notificacion(result.message, 'error')
        }
    }

    useEffect(() => {
      setValue('nombre', registro.nombre);
      setValue('controlador', registro.controlador);
      setValue('icono', registro.icono);
      setValue('clase', registro.clase);
      setValue('orden', registro.orden);
      setValue('nodo_padre', registro.nodo_padre);
      setValue('acciones', registro.acciones);
      setValue('descripcion', registro.descripcion);
      setValue('grupo', registro.grupo!);
      setValue('ruta', registro.ruta);
    }, [registro])
  
  return (
    <div
      className={`modal fade ${propModal.clase}`}         
      tabIndex={-1} 
      style={propModal.show ? {display:'block'} : {display:'none'}}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5">Agregar Módulo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
          </div>
          <form onSubmit={handleSubmit(registerModulo)} className='needs-validation'>
            <div className="modal-body">
              <div className='row'>
                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-nombre" className='fw-bold'>Nombre:</label>
                    <input id="id-nombre" type="text" className={`form-control input-solid ${errors.nombre ? 'is-invalid' : ''}`} 
                      {...register('nombre')}
                    />
                    {errors.nombre && (                                    
                                        <ErrorForm>{errors.nombre?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-controlador" className='fw-bold'>Controlador:</label>
                    <input id="id-controlador" type="text" className={`form-control input-solid ${errors.controlador ? 'is-invalid' : ''}`} 
                      {...register('controlador')}
                    />
                    {errors.controlador && (                                    
                                        <ErrorForm>{errors.controlador?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-icono" className='fw-bold'>Icono:</label>
                    <input id="id-icono" type="text" className={`form-control input-solid ${errors.icono ? 'is-invalid' : ''}`} 
                      {...register('icono')}
                    />
                    {errors.icono && (                                    
                                        <ErrorForm>{errors.icono?.message}</ErrorForm>
                                    )}
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-clase" className='fw-bold'>Clase:</label>
                    <input id="id-clase" type="text" className={`form-control input-solid ${errors.clase ? 'is-invalid' : ''}`} 
                      {...register('clase')}
                    />
                    {errors.clase && (                                    
                                        <ErrorForm>{errors.clase?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-orden" className='fw-bold'>Orden:</label>
                    <input id="id-orden" type="number" className={`form-control input-solid ${errors.orden ? 'is-invalid' : ''}`} 
                      {...register('orden')}
                    />
                    {errors.orden && (                                    
                                        <ErrorForm>{errors.orden?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-padre" className='fw-bold'>Módulo Padre:</label>
                    <input id="id-padre" type="number" className={`form-control input-solid ${errors.nodo_padre ? 'is-invalid' : ''}`} 
                      {...register('nodo_padre')}
                    />
                    {errors.nodo_padre && (                                    
                                        <ErrorForm>{errors.nodo_padre?.message}</ErrorForm>
                                    )}
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-acciones" className='fw-bold'>Acciones:</label>
                    <input id="id-acciones" type="text" className={`form-control input-solid ${errors.acciones ? 'is-invalid' : ''}`} 
                      {...register('acciones')}
                    />
                    {errors.acciones && (                                    
                                        <ErrorForm>{errors.acciones?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className="form-group">
                    <label htmlFor="id-descripcion" className='fw-bold'>Descripción:</label>
                    <input id="id-descripcion" type="text" className={`form-control input-solid ${errors.descripcion ? 'is-invalid' : ''}`} 
                      {...register('descripcion')}
                    />
                    {errors.descripcion && (                                    
                                        <ErrorForm>{errors.descripcion?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className="form-group">
                    <label htmlFor="id-grupo" className='fw-bold'>Grupo:</label>
                    <input id="id-grupo" type="number" className={`form-control input-solid ${errors.grupo ? 'is-invalid' : ''}`} 
                      {...register('grupo')}
                    />
                    {errors.grupo && (                                    
                                        <ErrorForm>{errors.grupo?.message}</ErrorForm>
                                    )}
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className="form-group">
                    <label htmlFor="id-ruta" className='fw-bold'>Ruta:</label>
                    <input id="id-ruta" type="text" className={`form-control input-solid ${errors.grupo ? 'is-invalid' : ''}`} 
                      {...register('ruta')}
                    />
                    {errors.ruta && (                                    
                                        <ErrorForm>{errors.ruta?.message}</ErrorForm>
                                    )}
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
