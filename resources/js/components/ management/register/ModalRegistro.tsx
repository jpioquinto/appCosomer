import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react'
import type { Option, PropsModal } from '../../../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import Select from 'react-select'

import { saveConflicto } from '../../../services/ConflictoService'
import { useCatalogStore } from '../../../store/catalogStore'
import { useEdoStore } from '../../../store/edoStore'
import { DraftRegistro } from '../../../types/conflicto'
import { isInteger, notificacion } from '../../../utils'
import ErrorForm from '../../partial/ErrorForm'


type Modaltype = {
    propModal:PropsModal,
    close: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function ModalRegistro({propModal, close}: Modaltype) {
    const [problematica, setProblematica] = useState<string>('');
    const [munpioId, setMunpioId] = useState<string>('');
    const {currentMnpios, listEdos, getEdos, listMunpios} = useEdoStore();
    const {
        getVertientes, getUnidades, getRegimenes, getEstatus, getOrganizaciones, 
        listVertientes, listUnidades, listRegimenes, listEstatus, listOrganizaciones} = useCatalogStore();
    const [optionsMunpios, setOptionsMunpios] = useState<Option[]>([]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],            
            [{ 'align': [] }],
            ['link'],
            ['clean']
          ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent','align',
        'link'
    ];

    const schema = z.object({
        fecha:z.string().min(10, {message: 'Seleccione una Fecha válida.'}),
        edoId:z.string().min(1, {message: 'Seleccione una Entidad Federativa.'}),
        munpioId:z.optional(z.string()).nullable(),
        promovente:z.string().min(6, {message: 'Ingrese el Promovente.'}),    
        contraparte:z.string().min(6, {message: 'Ingrese la Contraparte.'}),    
        vertienteId:z.string().min(1, {message: 'Seleccione la Vertiente.'}),
        supConflictoId:z.string().min(1, {message: 'Seleccione la Superficie en Conflicto.'}),
        supAtendidaId:z.string().min(1, {message: 'Seleccione la Superficie Atendida.'}),
        numBeneficiario:z.preprocess(
                (dato) => parseInt(z.string().parse(dato), 10),
                z.number().min(0)
        ),
        regSocialId:z.string().min(1, {message: 'Seleccione el Régimen Social.'}),
        estatusId:z.string().min(1, {message: 'Seleccione el Estatus.'}),
        sintEstatus:z.string().min(6, {message: 'Ingrese la Sintésis del Estatus.'}),
        orgInvolucradaId:z.string().min(1, {message: 'Seleccione la organización involucrada.'}),
        problematica:z.optional(z.string()).nullable()
    })

    type ValidationSchemaType = z.infer<typeof schema>

    const { register, handleSubmit, setValue , formState: { errors } } = useForm<ValidationSchemaType>({
            resolver: zodResolver(schema)
        })

    const selectEntidad = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        listMunpios(+e.target.value)        
    }

    const selectedMunpio = (e) => {
        setMunpioId(e.value)
    }

    const registerConflicto = async (data: DraftRegistro) => {
        if (!isInteger(munpioId)) {
            notificacion("Seleccione el municipio ó alcaldía.", 'error');
            return;
        }

        if (problematica.trim() == '' || problematica.trim().length<5) {
            notificacion("Capture la problemática de manera precisa y concisa.", 'error');
            return;
        }
        
        try {
            data.munpioId = +munpioId
            data.problematica = problematica
            console.log(data)

            const result = await saveConflicto(data)
            
            if (result?.solicitud) {
                /*setContact({...contact, ...data})
                setUser({
                    ...user,
                    name:data?.nombre!.toString(),
                    name_full:`${data?.nombre!.toString()} ${data?.apPaterno!.toString()} ${data?.apMaterno!.toString()}`
                })*/
                notificacion(result.message, 'success')
            } else {
                throw new Error(result?.response?.data?.message || result.message)
            }
        } catch(error) {
            notificacion(error.message, 'error')
        }
    }

    useEffect(() => {
        getEdos().length==0 ? listEdos() : undefined;
        getVertientes().length == 0 ? listVertientes() : undefined;
        getUnidades().length == 0 ? listUnidades() : undefined;
        getRegimenes().length == 0 ? listRegimenes() : undefined;
        getEstatus().length == 0 ? listEstatus() : undefined;
        getOrganizaciones().length == 0 ? listOrganizaciones() : undefined;
    }, [])

    useEffect(() => {
        let $options: Option[] = [];
        currentMnpios.forEach((municipio) => {
            $options.push({value: municipio.id, label: municipio.municipio, sigla:undefined})
        })

        setOptionsMunpios($options)
    } , [currentMnpios])
  return (
    <div
        className={`modal fade ${propModal.clase}`}         
        tabIndex={-1} 
        style={propModal.show ? {display:'block'} : {display:'none'}}  
    >
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="userModalLabel">Nuevo Conflicto</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>

                <form onSubmit={handleSubmit(registerConflicto)}  className='needs-validation'>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-md-4'>
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

                            <div className='col-md-4'>
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

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-municipio" className='fw-bold'>Municipio:</label>
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

                            <div className='col-md-4'>
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

                            <div className='col-md-4'>
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

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-vertiente" className='fw-bold'>Vertiente:</label>
                                    <select id="id-vertiente"  className={`form-control input-solid ${errors.vertienteId ? 'is-invalid' : ''}`} 
                                        {...register('vertienteId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {getVertientes().map(vertiente => (
                                            <option value={vertiente.id} key={vertiente.id}>{vertiente.vertiente}</option>
                                        ))}
                                    </select>
                                    {errors.vertienteId && (                                    
                                        <ErrorForm>{errors.vertienteId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-superficie" className='fw-bold'>Superficie en Conflicto:</label>
                                    <select id="id-superficie"  className={`form-control input-solid ${errors.supConflictoId ? 'is-invalid' : ''}`} 
                                        {...register('supConflictoId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {getUnidades().map(unidad => (
                                            <option value={unidad.id} key={unidad.id}>{unidad.descripcion} {unidad.unidad}</option>
                                        ))}
                                    </select>
                                    {errors.supConflictoId && (                                    
                                        <ErrorForm>{errors.supConflictoId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-super-atendida" className='fw-bold'>Superficie Atendida:</label>
                                    <select id="id-super-atendida"  className={`form-control input-solid ${errors.supAtendidaId ? 'is-invalid' : ''}`} 
                                        {...register('supAtendidaId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {getUnidades().map(unidad => (
                                            <option value={unidad.id} key={unidad.id}>{unidad.descripcion} {unidad.unidad}</option>
                                        ))}
                                    </select>
                                    {errors.supAtendidaId && (                                    
                                        <ErrorForm>{errors.supAtendidaId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-4'>
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
                                    <label htmlFor="id-regimen" className='fw-bold'>Regimen Social:</label>
                                    <select id="id-regimen"  className={`form-control input-solid ${errors.regSocialId ? 'is-invalid' : ''}`} 
                                        {...register('regSocialId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {getRegimenes().map(regimen => (
                                            <option value={regimen.id} key={regimen.id}>{regimen.regimen}</option>
                                        ))}
                                    </select>
                                    {errors.regSocialId && (                                    
                                        <ErrorForm>{errors.regSocialId?.message}</ErrorForm>
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
                                        {getEstatus().map(estatus => (
                                            <option value={estatus.id} key={estatus.id}>{estatus.descripcion}</option>
                                        ))}
                                    </select>
                                    {errors.estatusId && (                                    
                                        <ErrorForm>{errors.estatusId?.message}</ErrorForm>
                                    )}
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label htmlFor="id-org-involucrada" className='fw-bold'>Organización Involucrada:</label>
                                    <select id="id-org-involucrada"  className={`form-control input-solid ${errors.orgInvolucradaId ? 'is-invalid' : ''}`} 
                                        {...register('orgInvolucradaId')}
                                    >
                                        <option value="">Seleccione...</option>
                                        {getOrganizaciones().map(organizacion => (
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
                                    <label htmlFor="id-sintesis-estatus" className='fw-bold'>Sintésis del Estatus:</label>
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
                                        modules={modules}
                                        formats={formats}
                                        value={problematica} 
                                        onChange={setProblematica}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Crear</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}><i className="fa fa-window-close"></i> Cerrar</button>
                    </div>
                </form>                
            </div>
        </div>
    </div>
  )
}
