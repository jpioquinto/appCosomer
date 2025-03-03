import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react'
import type { Option, PropsModal } from '../../../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import Select from 'react-select'

import { updateConflicto as updateConflictoService} from '../../../services/ConflictoService'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import { useConflicto } from '../../../hooks/useConflicto'
import { DraftRegistro, Registro } from '../../../types/conflicto'
import { isInteger, notificacion } from '../../../utils'
import { useEdoStore } from '../../../store/edoStore'
import ErrorForm from '../../partial/ErrorForm'
import useModal from '../../../hooks/useModal'
import { RegistroSchema } from '../../../schema/conflicto-schema'
import { makeHash } from '../../../utils'


type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalRegistro({propModal, close}: Modaltype) {
    const [munpioId, setMunpioId] = useState<number>(0);
    const {currentMnpios, listEdos, getEdos, listMunpios} = useEdoStore();
    const {conflicto, updateConflicto, setKeyTable} = useConflictStore();

    const [problematica, setProblematica] = useState<string>(conflicto ? conflicto.problematica : '');

    const {catalog, form, config} = useConflicto();

    const {hideModal} = useModal();

    const [optionsMunpios, setOptionsMunpios] = useState<Option[]>([]);

    const [option, setOption] = useState<Option>({} as Option)

    type ValidationSchemaType = z.infer<typeof form.schema>

    const { register, handleSubmit, setValue , formState: { errors }, reset } = useForm<ValidationSchemaType>({
            resolver: zodResolver(form.schema)
        })

    const selectEntidad = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        listMunpios(+e.target.value)        
    }

    const selectedMunpio = (e) => {
        setMunpioId(e.value)
        setOption(e)
    }

     const processResult = response => {
        const result = RegistroSchema.safeParse(response)
        if (result.success) {
            updateConflicto(result.data)            
            setKeyTable(makeHash(12))
        }             
    }

    const registerConflicto = async (data: DraftRegistro) => {
        if (munpioId<=0) {
            notificacion("Seleccione el municipio ó alcaldía.", 'error');
            return;
        }

        if (problematica.trim() == '' || problematica.trim().length<5) {
            notificacion("Capture la problemática de manera precisa y concisa.", 'error');
            return;
        }
        
        try {
            data.munpioId = +munpioId;
            data.problematica = problematica;
            
            const result = await updateConflictoService({...data, id: conflicto.id})
            
            if (result?.solicitud) {
                processResult(result?.conflicto)                
                hideModal()
                notificacion(result?.message, 'success')
                reset()
            } else {
                throw new Error(result?.response?.data?.message || result.message)
            }
        } catch(error) {
            notificacion(error.message, 'error')
        }
    }

    useEffect(() => {
        getEdos().length==0 ? listEdos() : undefined;
        catalog.getVertientes().length == 0 ? catalog.listVertientes() : undefined;
        catalog.getRegimenes().length == 0 ? catalog.listRegimenes() : undefined;
        catalog.getEstatus().length == 0 ? catalog.listEstatus() : undefined;
        catalog.getOrganizaciones().length == 0 ? catalog.listOrganizaciones() : undefined;
    }, [])

    useEffect(() => {
        let $options: Option[] = [];
        currentMnpios.forEach((municipio) => {
            $options.push({value: municipio.id, label: municipio.municipio, sigla:undefined})
        })

        setOptionsMunpios($options)        
    } , [currentMnpios])

    useEffect(() => {
        let supConflicto = conflicto?.supconflicto ? conflicto.supconflicto.split('-') : [];
        let supAtentida  = conflicto?.supatendida ? conflicto.supatendida.split('-')  : [];
        
        if (supConflicto.length> 0) {
            setValue('ha', +supConflicto[0]);
            setValue('area', +supConflicto[1]);
            setValue('ca', +supConflicto[2]);
        }

        if (supAtentida.length> 0) {
            setValue('haa', +supAtentida[0]);
            setValue('areaa', +supAtentida[1]);
            setValue('caa', +supAtentida[2]);
        }

        setValue('fecha', conflicto.fecha)
        setValue('edoId', conflicto?.edoId ? conflicto.edoId.toString() : '')
        setValue('munpioId', conflicto?.munpioId ? conflicto.munpioId.toString() : '')
        setValue('vertienteId', conflicto?.vertienteId ? conflicto.vertienteId.toString() : '')
        setValue('promovente', conflicto.promovente)
        setValue('contraparte', conflicto.contraparte)
        setValue('numBeneficiario', conflicto.numBeneficiario)
        setValue('regSocialId', conflicto?.regSocialId ? conflicto.regSocialId.toString() : '')
        setValue('estatusId', conflicto?.estatusId ? conflicto.estatusId.toString() : '')
        setValue('orgInvolucradaId', conflicto?.orgInvolucradaId ? conflicto.orgInvolucradaId.toString() : '')
        setValue('sintEstatus', conflicto.sintEstatus)
        setValue('problematica', conflicto.problematica)
        setProblematica(conflicto.problematica)
        setMunpioId(conflicto.munpioId)
        conflicto.edoId ? listMunpios(+conflicto.edoId) : undefined 
                
    }, [conflicto])
  return (
    <div
        className={`modal fade ${propModal.clase}`}         
        tabIndex={-1} 
        style={propModal.show ? {display:'block'} : {display:'none'}}  
    >
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="userModalLabel">Editar Registro</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>

                <form onSubmit={handleSubmit(registerConflicto)}  className='needs-validation'>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-fecha" className='fw-bold'>Fecha:</label>
                                    <input id="id-fecha" type="date" className={`form-control input-solid ${errors.fecha ? 'is-invalid' : ''}`} 
                                        {...register('fecha')}
                                    />
                                    {errors.fecha && (                                    
                                        <ErrorForm>{errors.fecha?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-estado" className='fw-bold'>Estado:</label>
                                    <select id="id-estado"  className={`form-control input-solid ${errors.edoId ? 'is-invalid' : ''}`} 
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

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-municipio" className='fw-bold'>Municipio:</label>
                                    <Select 
                                        placeholder='Seleccione...'
                                        value={optionsMunpios.filter(({ value }) => value === munpioId)}
                                        options={optionsMunpios}                                                                                           
                                        onChange={selectedMunpio}   
                                    />
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-vertiente" className='fw-bold'>Vertiente:</label>
                                    <select id="id-vertiente"  className={`form-control ${errors.vertienteId ? 'is-invalid' : ''}`} 
                                        {...register('vertienteId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {catalog.getVertientes().map(vertiente => (
                                            <option value={vertiente.id} key={vertiente.id}>{vertiente.vertiente}</option>
                                        ))}
                                    </select>
                                    {errors.vertienteId && (                                    
                                        <ErrorForm>{errors.vertienteId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-promovente" className='fw-bold'>Promovente:</label>
                                    <input id="id-promovente" type="text" className={`form-control input-solid ${errors.promovente ? 'is-invalid' : ''}`} 
                                        {...register('promovente')}
                                    />
                                    {errors.promovente && (                                    
                                        <ErrorForm>{errors.promovente?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-contra-parte" className='fw-bold'>Contraparte:</label>
                                    <input id="id-contra-parte" type="text" className={`form-control input-solid ${errors.contraparte ? 'is-invalid' : ''}`} 
                                        {...register('contraparte')}
                                    />
                                    {errors.contraparte && (                                    
                                        <ErrorForm>{errors.contraparte?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-superficie" className='fw-bold'>Superficie en Conflicto:</label>
                                    <div className='d-flex align-items-center'>
                                        <input type='number' placeholder='Hectárea(s)' className={`form-control ${errors.ha ? 'is-invalid' : ''}`} {...register('ha')}/> - 
                                        <input type='number' placeholder='Área(s)' className={`form-control ${errors.area ? 'is-invalid' : ''}`} {...register('area')}/> - 
                                        <input type='text' placeholder='Centiárea(s)' className={`form-control ${errors.ca ? 'is-invalid' : ''}`} {...register('ca')}/>
                                    </div>
                                    {errors.ha && (                                    
                                        <ErrorForm>{errors.ha?.message}</ErrorForm>
                                    )}  
                                    {errors.area && (                                    
                                        <ErrorForm>{errors.area?.message}</ErrorForm>
                                    )} 
                                    {errors.ca && (                                    
                                        <ErrorForm>{errors.ca?.message}</ErrorForm>
                                    )}                                       
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-super-atendida" className='fw-bold'>Superficie Atendida:</label>                                        
                                    <div className='d-flex align-items-center'>
                                        <input type='number' placeholder='Hectárea(s)' className={`form-control ${errors.haa ? 'is-invalid' : ''}`} {...register('haa')}/> - 
                                        <input type='number' placeholder='Área(s)' className={`form-control ${errors.areaa ? 'is-invalid' : ''}`} {...register('areaa')}/> - 
                                        <input type='text' placeholder='Centiárea(s)' className={`form-control ${errors.caa ? 'is-invalid' : ''}`} {...register('caa')}/>
                                    </div>
                                    {errors.haa && (                                    
                                        <ErrorForm>{errors.haa?.message}</ErrorForm>
                                    )}  
                                    {errors.areaa && (                                    
                                        <ErrorForm>{errors.areaa?.message}</ErrorForm>
                                    )} 
                                    {errors.caa && (                                    
                                        <ErrorForm>{errors.caa?.message}</ErrorForm>
                                    )} 
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-num-beneficiarios" className='fw-bold'>Número de Beneficiarios:</label>
                                    <input id="id-num-beneficiarios" type="number" className={`form-control input-solid ${errors.numBeneficiario ? 'is-invalid' : ''}`} 
                                        {...register('numBeneficiario')}
                                    />
                                    {errors.numBeneficiario && (                                    
                                        <ErrorForm>{errors.numBeneficiario?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-regimen" className='fw-bold'>Regimen Social:</label>
                                    <select id="id-regimen"  className={`form-control input-solid ${errors.regSocialId ? 'is-invalid' : ''}`} 
                                        {...register('regSocialId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {catalog.getRegimenes().map(regimen => (
                                            <option value={regimen.id} key={regimen.id}>{regimen.regimen}</option>
                                        ))}
                                    </select>
                                    {errors.regSocialId && (                                    
                                        <ErrorForm>{errors.regSocialId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-estatus" className='fw-bold'>Estatus:</label>
                                    <select id="id-estatus"  className={`form-control ${errors.estatusId ? 'is-invalid' : ''}`} disabled
                                        {...register('estatusId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {catalog.getEstatus().map(estatus => (
                                            <option value={estatus.id} key={estatus.id}>{estatus.descripcion}</option>
                                        ))}
                                    </select>
                                    {errors.estatusId && (                                    
                                        <ErrorForm>{errors.estatusId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>
                            
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-org-involucrada" className='fw-bold'>Organización Involucrada:</label>
                                    <select id="id-org-involucrada"  className={`form-control ${errors.orgInvolucradaId ? 'is-invalid' : ''}`} 
                                        {...register('orgInvolucradaId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {catalog.getOrganizaciones().map(organizacion => (
                                            <option value={organizacion.id} key={organizacion.id}>{organizacion.nombre}</option>
                                        ))}
                                    </select>
                                    {errors.orgInvolucradaId && (                                    
                                        <ErrorForm>{errors.orgInvolucradaId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-sintesis-estatus" className='fw-bold'>Sintésis de Atención:</label>
                                    <textarea 
                                        id="id-sintesis-estatus" className={`form-control input-solid ${errors.sintEstatus ? 'is-invalid' : ''}`} 
                                        {...register('sintEstatus')}
                                        rows={4}
                                    />
                                    {errors.sintEstatus && (                                    
                                        <ErrorForm>{errors.sintEstatus?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-problematica" className='fw-bold'>Problemática:</label>
                                    <ReactQuill 
                                        theme="snow" 
                                        modules={config.modules}
                                        formats={config.formats}
                                        value={problematica} 
                                        onChange={setProblematica}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Actualizar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}><i className="fa fa-window-close"></i> Cerrar</button>
                    </div>
                </form>                
            </div>
        </div>
    </div>
  )
}
