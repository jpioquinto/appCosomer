import React, {MouseEvent} from 'react'

import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

import { useUserNav } from '../../../../hooks/useUserNav'
import { useFilter } from '../../../../hooks/useFilter'

type FilterProps = {
    clickConsultar?: (e: MouseEvent<HTMLButtonElement>) => void,
    hideStatus?:boolean
}

export default function Filter({clickConsultar, hideStatus} : FilterProps) {    
    const {options, events, data, yearConfig} = useFilter()   

    const {toggle, handlerCollapse} = useUserNav()
    
    const components = { DropdownIndicator: null}

  return (
    <>
        <div className='container-fluid shadow-sm bg-body-tertiary'>
            <div className='d-flex justify-content-end flex-md-row py-0 my-0'>
                <div className='me-2 pt-1'>
                    <p className='fw-semibold text-body-tertiary text-decoration-underline'>Filtros de búsqueda</p>
                </div>
                <div className='pt-2'>
                    <button className='btn btn-icon btn-round btn-black btn-xs' onClick={handlerCollapse}>
                        <i className={`${toggle.show ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'}`} />
                    </button>
                </div>
            </div>
            <div className={`row ${toggle.collapse}`}>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="id-states" className='fw-semibold'>Entidades</label>
                        <Select                    
                            isMulti
                            options={options.optionsEdos}
                            name="colors"                    
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={events.selectEnty}
                            menuPortalTarget={document.body} 
                            styles={{menuPortal: base => ({ ...base, zIndex: 9999 })}}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="id-entities" className='fw-semibold'>Alcaldía / Municipio</label>
                        <Select                    
                            isMulti
                            name="colors"                    
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={data.optionsMunpios}
                            onChange={events.selectMunpio}
                            value={options.optionsMunpiosSelected}
                            menuPortalTarget={document.body} 
                            styles={{menuPortal: base => ({ ...base, zIndex: 9999 })}}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="id-slope" className='fw-semibold'>Tipo de Asunto</label>
                        <Select                    
                            isMulti
                            options={options.optionsVertientes}
                            name="colors"                    
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={events.selectSlope}
                            menuPortalTarget={document.body} 
                            styles={{menuPortal: base => ({ ...base, zIndex: 9999 })}}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="id-year" className='fw-semibold'>Año</label>
                        <CreatableSelect
                            components={components}
                            inputValue={yearConfig.inputValue}
                            isClearable
                            isMulti
                            menuIsOpen={false}
                            onChange={(newValue) => yearConfig.setValue(newValue)}
                            onInputChange={(newValue) => yearConfig.setInputValue(newValue)}
                            onKeyDown={yearConfig.handleKeyDown}
                            placeholder="Capture y presione [ENTER]..."
                            value={yearConfig.value}
                            menuPortalTarget={document.body} 
                            styles={{menuPortal: base => ({ ...base, zIndex: 9999 })}}
                        />
                    </div>
                </div>
                <div className={`col-md-4 ${hideStatus ? 'd-none' : ''}`}>
                    <div className="form-group">
                        <label htmlFor="id-slope" className='fw-semibold'>Estatus</label>
                        <Select                    
                            isMulti
                            options={options.optionsStatus}
                            name="colors"                    
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={events.selectStatus}
                            menuPortalTarget={document.body} 
                            styles={{menuPortal: base => ({ ...base, zIndex: 9999 })}}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='d-flex align-items-end'>
                        <div className="form-group pe-1 w-75">
                            <label htmlFor="id-search" className='fw-semibold'>Buscar</label>
                            <input type='text' className='form-control' id='id-search' onChange={events.changeInputCapture}/>                      
                        </div>
                        <div className="form-group ps-0 mb-1">
                            <button type="button" className="btn btn-black btn-sm fw-semibold" onClick={clickConsultar || events.clickConsultar}>
                                <i className="fas fa-search" ></i> Consultar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
