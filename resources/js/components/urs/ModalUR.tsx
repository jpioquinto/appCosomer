import React, {MouseEvent, ChangeEvent, useState, useEffect } from 'react'
import type { PropsModal } from '../../types'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorForm from '../partial/ErrorForm'
import { saveUR } from '../../services/UrService'
import useModal from '../../hooks/useModal'
import {notificacion} from '../../utils'
import { useEdoStore } from '../../store/edoStore'
import { useURStore } from '../../store/urStore'
import { MunpioSchema, Option, DrafUR } from '../../types'
import Select from 'react-select'
import { URSchema } from '../../schema/ur-schema'

type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}
export default function ModalUR({propModal, close}: Modaltype) {
    const {hideModal} = useModal()

    const [optionsMunpios, setOptionsMunpios] = useState<Option[]>([])

    const [mpio, setMunpio] = useState<MunpioSchema['id']>(0)

    const {currentMnpios, getEdos, listMunpios} = useEdoStore()

    const {addUR, updateUR, ur} = useURStore()
    
    const schema = z.object({
        ur: z.string().min(6, {message: 'Ingrese un nombre valido para una Unidad Responsable.'}),
        sigla: z.string().min(2, {message: 'Capture el acrónimo para la Unidad Responsable.'}),
        calle: z.optional(z.string()).nullable(),
        ext: z.optional(z.string()).nullable(),
        int: z.optional(z.string()).nullable(),
        col: z.optional(z.string()).nullable(),
        cp: z.optional(z.string()).nullable(),
        edoId: z.optional(z.string()).nullable(),
        mpio: z.optional(z.number()).nullable(),
      })      

    useEffect(() => {
        let $options: Option[] = [];
        currentMnpios.forEach((municipio) => {
            $options.push({value: municipio.id, label: municipio.municipio, sigla:undefined})
        })

        setOptionsMunpios($options)
    } , [currentMnpios])

    type ValidationSchemaType = z.infer<typeof schema>

    const { register, handleSubmit, setValue , formState: { errors }, watch, reset } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        setValue('ur', ur.nombre)
        setValue('sigla', ur.sigla)
        setValue('calle', ur.calle)
        setValue('ext', ur.ext)
        setValue('int', ur.int)
        setValue('col', ur.col)
        setValue('cp', ur.cp)
        setValue('edoId', ur.edoId?.toString())
    }, [ur])

    const processResult = response => {
        const result = URSchema.safeParse(response)
        if (result.success) {
            ur?.id ? updateUR(result.data) : addUR(result.data) 
        }             
    }
    const registerUR = async (data: DrafUR) => {
        const result = await saveUR({...data, mpio, id: (ur?.id ? ur.id : undefined)});
        
        if (result.response) {
            processResult(result.ur)         
            hideModal()
            notificacion(result.message, 'success')
            reset()
        } else {
            notificacion(result.message, 'error')
        }
    }

    const selectEntidad = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        listMunpios(+e.target.value)        
    }

    const selectedMunpio = (e) => {
        setMunpio(e.value)
    }

    const capturaUR = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        //setSigla(e.target.value.toString().replace(/[a-z|á-ú|ñ|Ñ|ü|Ü\s]*/g,''));
        document.getElementById('id-input-sigla') 
        ? document.getElementById('id-input-sigla').value = e.target.value.toString().replace(/[a-z|á-ú|ñ|Ñ|ü|Ü|,\s]*/g,'')
        : undefined;
    }

  return (
    <div 
        className={`modal fade ${propModal.clase}`}         
        tabIndex={-1} 
        aria-labelledby="urModalLabel" 
        aria-modal={propModal.show ? "true" : undefined}     
        style={propModal.show ? {display:'block'} : {display:'none'}}     
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="urModalLabel">{ur?.id ? 'Actualizar UR' : 'Nueva UR'}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>
                <form onSubmit={handleSubmit(registerUR)} className="needs-validation">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="id-input-nombre">Nombre</label>
                                    <input 
                                        type="text" id="id-input-nombre" className={`form-control ${errors.ur ? 'is-invalid' : ''}`} required                                        
                                        {...register('ur')}
                                        onChange={capturaUR}
                                    />
                                    {errors.ur && (                                    
                                        <ErrorForm>{errors.ur?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="id-input-sigla">Acrónimo</label>
                                    <input 
                                        type="text" id="id-input-sigla" className={`form-control ${errors.sigla ? 'is-invalid' : ''}`} required                                        
                                        {...register('sigla')}
                                    />
                                    {errors.sigla && (                                    
                                        <ErrorForm>{errors.sigla?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="id-input-calle">Calle</label>
                                    <input 
                                        type="text" id="id-input-calle" className={`form-control ${errors.calle ? 'is-invalid' : ''}`}                                        
                                        {...register('calle')}
                                    />
                                    {errors.calle && (                                    
                                        <ErrorForm>{errors.calle?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="id-input-ext">Num. Exterior</label>
                                    <input 
                                        type="text" id="id-input-ext" className={`form-control ${errors.ext ? 'is-invalid' : ''}`}                                        
                                        {...register('ext')}
                                    />
                                    {errors.ext && (                                    
                                        <ErrorForm>{errors.ext?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="id-input-int">Num. Interior</label>
                                    <input 
                                        type="text" id="id-input-int" className={`form-control ${errors.int ? 'is-invalid' : ''}`}                                        
                                        {...register('int')}
                                    />
                                    {errors.int && (                                    
                                        <ErrorForm>{errors.int?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-8">
                                <div className="form-group">
                                    <label htmlFor="id-input-col">Colonia</label>
                                    <input 
                                        type="text" id="id-input-col" className={`form-control ${errors.col ? 'is-invalid' : ''}`}                                        
                                        {...register('col')}
                                    />
                                    {errors.col && (                                    
                                        <ErrorForm>{errors.col?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="id-input-cp">CP</label>
                                    <input 
                                        type="text" id="id-input-cp" className={`form-control ${errors.cp ? 'is-invalid' : ''}`}                                        
                                        {...register('cp')}
                                    />
                                    {errors.cp && (                                    
                                        <ErrorForm>{errors.cp?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="id-select-edo">Entidad</label>
                                    <select 
                                        id="id-select-edo" 
                                        className={`form-control ${errors.edoId ? 'is-invalid' : ''}`}
                                        {...register('edoId')}
                                        onChange={selectEntidad}
                                    >
                                        <option value="">Seleccione...</option>
                                        {getEdos().map(entidad => (
                                            <option value={entidad.id} key={entidad.id}>{entidad.estado}</option>
                                        ))}
                                        
                                    </select>
                                    {errors.edoId && (                                    
                                        <ErrorForm>{errors.edoId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="id-select-mpio">Delgación / Municipio</label>
                                    <Select 
                                        placeholder='Seleccione...'
                                        options={optionsMunpios} 
                                        menuPortalTarget={document.querySelector('.swal2-container')}
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                textAlign: 'left',
                                            })
                                        }}
                                        onChange={selectedMunpio}
                                    />
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> {ur?.id ? 'Actualizar' : 'Crear'}</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}><i className="fa fa-window-close"></i> Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
