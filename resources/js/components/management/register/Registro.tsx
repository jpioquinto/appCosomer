import React, {useState, useEffect, ChangeEvent} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { saveConflicto } from '../../../services/ConflictoService';
import type { DraftFormConflicto } from '../../../types/form';
import { useConflicto } from '../../../hooks/useConflicto';
import { notificacion, isInteger} from '../../../utils';
import { useEdoStore } from '../../../store/edoStore';
import ErrorForm from '../../partial/ErrorForm';
import type { Option } from '../../../types';
import Select from 'react-select';

export default function Registro() {
    const {currentMnpios, listEdos, getEdos, listMunpios} = useEdoStore();
    const [observaciones, setObservaciones] = useState<string>('');
    const [problematica, setProblematica] = useState<string>('');
    const [munpioId, setMunpioId] = useState<string>('');
    const {catalog, form, config} = useConflicto();

    const [optionsMunpios, setOptionsMunpios] = useState<Option[]>([]);

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
    }

    const registerConflicto:SubmitHandler<DraftFormConflicto>  = async (data) => {        
        if (!isInteger(munpioId)) {
            notificacion("Seleccione el municipio ó alcaldía.", 'error');
            return;
        }

        if (problematica.trim() == '' || problematica.trim().length<5) {
            notificacion("Capture la problemática de manera precisa y concisa.", 'error');
            return;
        }

        try {
            data.munpioId = munpioId;
            data.problematica = problematica;
            (observaciones.trim() !== '' && observaciones.trim() !== '<p><br></p>') ? data.observaciones = observaciones : undefined;
            
            const result = await saveConflicto(data);
            
            if (result?.solicitud) {
                reset(); setProblematica(''); setMunpioId(''); setOptionsMunpios([]); selectedMunpio({label:'', value:0});
                setObservaciones(''); notificacion(result.message, 'success');
            } else {
                throw new Error(result?.response?.data?.message || result.message);
            }
        } catch(error) {
            notificacion(error.message, 'error');
        }
    }

    useEffect(() => {
        getEdos().length==0 ? listEdos() : undefined;
        catalog.getVertientes().length == 0 ? catalog.listVertientes() : undefined;
        catalog.getRegimenes().length == 0  ? catalog.listRegimenes()  : undefined;
        catalog.getEstatus().length == 0    ? catalog.listEstatus()    : undefined;
        catalog.getOrganizaciones().length == 0 ? catalog.listOrganizaciones() : undefined;
    }, [])

    useEffect(() => {
        let $options: Option[] = [];
        currentMnpios.forEach((municipio) => {
            $options.push({value: municipio.id, label: municipio.municipio})
        })

        setOptionsMunpios($options)
    } , [currentMnpios])

  return (
    <>
      <div className="panel-header bg-primary-gradient">
            <div className="page-inner py-5">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                    <div>
                        <h3 className="text-white fw-bold mb-3">Registro</h3>
                        <h6 className="text-white op-7 mb-2">Por favor, ingrese la información</h6>
                    </div>
                </div>
            </div>
        </div>
        <div className="page-inner mt--5 pt-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card full-height">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(registerConflicto)}  className='row needs-validation'>
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

                                <div className='col-md-6'>
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

                                <div className="col-md-12">
                                    <div className="ml-md-auto mt-5 py-2 py-md-0 pull-right">
                                        <button type="submit" className="btn btn-dark btn-round me-2">
                                            <i className="fa fa-save"/> Guardar
                                        </button>
                                    </div>
                                </div>  

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
