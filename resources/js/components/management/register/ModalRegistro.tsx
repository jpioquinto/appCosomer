import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react'
import type { Option, PropsModal } from '../../../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import Select from 'react-select'

import { updateConflicto as updateConflictoService} from '../../../services/ConflictoService'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import { RegistroSchema } from '../../../schema/conflicto-schema'
import type { DraftFormConflicto } from '../../../types/form'
import { useConflicto } from '../../../hooks/useConflicto'
import { notificacion } from '../../../utils'
import { useEdoStore } from '../../../store/edoStore'
import ErrorForm from '../../partial/ErrorForm'
import useModal from '../../../hooks/useModal'
import { makeHash } from '../../../utils'

type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalRegistro({propModal, close}: Modaltype) {
    const {currentMnpios, listEdos, getEdos, listMunpios} = useEdoStore();
    const {conflicto, updateConflicto, setKeyTable} = useConflictStore();
    const [munpioId, setMunpioId] = useState<number>(0);

    const [observaciones, setObservaciones] = useState<string>(conflicto ? conflicto.observaciones! : '');
    const [problematica, setProblematica] = useState<string>(conflicto ? conflicto.problematica! : '');

    const {catalog, form, config} = useConflicto();

    const {hideModal} = useModal();

    const [optionsMunpios, setOptionsMunpios] = useState<Option[]>([]);

    const [optionSelected, setOptionSelected] = useState<Option>({} as Option)

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
        setOptionSelected(e)
    }

     const processResult = response => {
        const result = RegistroSchema.safeParse(response)
        if (result.success) {
            updateConflicto(result.data)            
            setKeyTable(makeHash(12))
        }             
    }

    const initMunpio = (munpio: Option[]) => {
        if (munpio.length == 0) {
            return 
        }
        setOptionSelected(munpio[0])
    }

    const registerConflicto: SubmitHandler<DraftFormConflicto> = async (data) => {
        if (munpioId<=0) {
            notificacion("Seleccione el municipio ó alcaldía.", 'error');
            return;
        }

        if (problematica.trim() == '' || problematica.trim().length<5) {
            notificacion("Capture la problemática de manera precisa y concisa.", 'error');
            return;
        }
        
        try {
            data.munpioId = munpioId.toString();
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
            $options.push({value: municipio.id, label: municipio.municipio})
        })

        setOptionsMunpios($options)   
        initMunpio($options.filter($option => $option.value === munpioId))     
    } , [currentMnpios])

    useEffect(() => {
        let supConflicto = conflicto?.supconflicto ? conflicto.supconflicto.split('-') : [];
                
        if (supConflicto.length> 0) {
            setValue('ha', +supConflicto[0]);
            setValue('area', +supConflicto[1]);
            setValue('ca', +supConflicto[2]);
        }

        setValue('fecha', conflicto.fecha!)
        setValue('edoId', conflicto?.edoId ? conflicto.edoId.toString() : '')
        setValue('munpioId', conflicto?.munpioId ? conflicto.munpioId.toString() : '')
        setValue('vertienteId', conflicto?.vertienteId ? conflicto.vertienteId.toString() : '')
        setValue('promovente', conflicto.promovente!)
        setValue('contraparte', conflicto.contraparte!)
        setValue('numBeneficiario', conflicto.numBeneficiario!)
        setValue('regSocialId', conflicto?.regSocialId ? conflicto.regSocialId.toString() : '')
        setValue('estatusId', conflicto?.estatusId ? conflicto.estatusId.toString() : '')
        setValue('orgInvolucradaId', conflicto?.orgInvolucradaId ? conflicto.orgInvolucradaId.toString() : '')        
        setValue('problematica', conflicto.problematica)
        setProblematica(conflicto.problematica!)
        setObservaciones(conflicto.observaciones!)
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
                                    <label htmlFor="id-fecha" className='fw-bold'>Fecha de Incorporación:</label>
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
                                        options={optionsMunpios} 
                                        menuPortalTarget={document.body}
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                textAlign: 'left',
                                            })
                                        }}                                                    
                                        onChange={selectedMunpio}
                                        value={optionSelected}                                                    
                                    />
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label htmlFor="id-vertiente" className='fw-bold'>Tipo de Conflicto:</label>
                                    <select id="id-vertiente"  className={`form-control input-solid ${errors.vertienteId ? 'is-invalid' : ''}`} 
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

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-asunto" className='fw-bold'>Asunto:</label>
                                    <input id="id-asunto" type="text" className={`form-control input-solid ${errors.asunto ? 'is-invalid' : ''}`} 
                                        {...register('asunto')}
                                    />
                                    {errors.asunto && (                                    
                                        <ErrorForm>{errors.asunto?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-predio" className='fw-bold'>Nombre del Predio:</label>
                                    <input id="id-predio" type="text" className={`form-control input-solid ${errors.predio ? 'is-invalid' : ''}`} 
                                        {...register('predio')}
                                    />
                                    {errors.predio && (                                    
                                        <ErrorForm>{errors.predio?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-6'>
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

                            <div className='col-md-6'>
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
                            
                            <div className='col-md-6'>
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

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-org-involucrada" className='fw-bold'>Organización Involucrada:</label>
                                    <select id="id-org-involucrada"  className={`form-control input-solid ${errors.orgInvolucradaId ? 'is-invalid' : ''}`} 
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

                            <div className='col-md-2'>
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

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-regimen" className='fw-bold'>Régimen Social:</label>
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

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-nombre-regsoc" className='fw-bold'>Nombre del Régimen Social:</label>
                                    <input id="id-nombre-regsoc" type="text" className={`form-control input-solid ${errors.nombreRegSoc ? 'is-invalid' : ''}`} 
                                        {...register('nombreRegSoc')}
                                    />
                                    {errors.nombreRegSoc && (                                    
                                        <ErrorForm>{errors.nombreRegSoc?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-2'>
                                <div className="form-group">
                                    <label htmlFor="id-efiscal" className='fw-bold'>Ejercicio Fiscal:</label>
                                    <input id="id-efiscal" type="number" className={`form-control input-solid ${errors.anioFiscal ? 'is-invalid' : ''}`} 
                                        {...register('anioFiscal')}
                                    />
                                    {errors.anioFiscal && (                                    
                                        <ErrorForm>{errors.anioFiscal?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-estatus" className='fw-bold'>Estatus:</label>
                                    <select id="id-estatus"  className={`form-control input-solid ${errors.estatusId ? 'is-invalid' : ''}`} 
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

                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="id-pueblo-indigena" className='fw-bold'>Pueblo Indigena:</label>
                                    <input id="id-pueblo-indigena" type="text" className={`form-control input-solid ${errors.puebloIndigena ? 'is-invalid' : ''}`} 
                                        {...register('puebloIndigena')}
                                    />
                                    {errors.puebloIndigena && (                                    
                                        <ErrorForm>{errors.puebloIndigena?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>                            
                                                        
                            <div className='col-md-12'>
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

                            <div className='col-md-12'>
                                <div className="form-group">
                                    <label htmlFor="id-sintesis-estatus" className='fw-bold'>Observaciones:</label>
                                    <ReactQuill 
                                        theme="snow" 
                                        modules={config.modules}
                                        formats={config.formats}
                                        value={observaciones} 
                                        onChange={setObservaciones}
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
