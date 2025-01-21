import React, {useState, useEffect, ChangeEvent} from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useEdoStore } from '../../../store/edoStore';
import { useCatalogStore } from '../../../store/catalogStore';
import type { Option } from '../../../types';
import Select from 'react-select';

export default function Registro() {
    const [problematica, setProblematica] = useState('');
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
        'list', 'bullet', 'indent','align',
        'link','clean'
    ];

    const selectEntidad = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        listMunpios(+e.target.value)        
    }

    const selectedMunpio = (e) => {
        //setMunpioId(e.value)
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
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-fecha" className='fw-bold'>Fecha:</label>
                                        <input id="id-fecha" type="date" className={`form-control input-solid`} 
                                        />
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-estado" className='fw-bold'>Estado:</label>
                                        <select id="id-estado"  className={`form-control input-solid`} 
                                            onChange={selectEntidad}
                                        >
                                            <option value="">Seleccione...</option>
                                            {getEdos().map(entidad => (
                                                <option value={entidad.id} key={entidad.id}>{entidad.estado}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-3'>
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

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-promovente" className='fw-bold'>Promovente:</label>
                                        <input id="id-promovente" type="text" className={`form-control input-solid`} 
                                        />
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-contra-parte" className='fw-bold'>Contraparte:</label>
                                        <input id="id-contra-parte" type="text" className={`form-control input-solid`} 
                                        />
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-vertiente" className='fw-bold'>Vertiente:</label>
                                        <select id="id-vertiente"  className={`form-control input-solid`} 
                                        >
                                            <option value="">Seleccione...</option>
                                            {getVertientes().map(vertiente => (
                                                <option value={vertiente.id} key={vertiente.id}>{vertiente.vertiente}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-superficie" className='fw-bold'>Superficie en Conflicto:</label>
                                        <select id="id-superficie"  className={`form-control input-solid`} 
                                        >
                                            <option value="">Seleccione...</option>
                                            {getUnidades().map(unidad => (
                                                <option value={unidad.id} key={unidad.id}>{unidad.descripcion} {unidad.unidad}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-super-atendida" className='fw-bold'>Superficie Atendida:</label>
                                        <select id="id-super-atendida"  className={`form-control input-solid`} 
                                        >
                                            <option value="">Seleccione...</option>
                                            {getUnidades().map(unidad => (
                                                <option value={unidad.id} key={unidad.id}>{unidad.descripcion} {unidad.unidad}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-num-beneficiarios" className='fw-bold'>Número de Beneficiarios:</label>
                                        <input id="id-num-beneficiarios" type="text" className={`form-control input-solid`} 
                                        />
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-regimen" className='fw-bold'>Regimen Social:</label>
                                        <select id="id-regimen"  className={`form-control input-solid`} 
                                        >
                                            <option value="">Seleccione...</option>
                                            {getRegimenes().map(regimen => (
                                                <option value={regimen.id} key={regimen.id}>{regimen.regimen}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-estatus" className='fw-bold'>Estatus:</label>
                                        <select id="id-estatus"  className={`form-control input-solid`} 
                                        >
                                            <option value="">Seleccione...</option>
                                            {getEstatus().map(estatus => (
                                                <option value={estatus.id} key={estatus.id}>{estatus.descripcion}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-sintesis-estatus" className='fw-bold'>Sintésis del Estatus:</label>
                                        <input id="id-sintesis-estatus" type="text" className={`form-control input-solid`} 
                                        />
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className="form-group">
                                        <label htmlFor="id-org-involucrada" className='fw-bold'>Organización Involucrada:</label>
                                        <select id="id-org-involucrada"  className={`form-control input-solid`} 
                                        >
                                            <option value="">Seleccione...</option>
                                            {getOrganizaciones().map(organizacion => (
                                                <option value={organizacion.id} key={organizacion.id}>{organizacion.nombre}</option>
                                            ))}
                                        </select>
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

                                <div className="col-md-12">
                                    <div className="ml-md-auto mt-5 py-2 py-md-0 pull-right">
                                        <button type="button" className="btn btn-primary btn-round me-2">
                                            <i className="fa fa-save"/> Guardar
                                        </button>
                                        <button className="btn btn-secondary btn-round">Salir</button>
                                    </div>
                                </div>  

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
