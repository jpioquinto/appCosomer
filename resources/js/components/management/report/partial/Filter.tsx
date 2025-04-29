import React from 'react'

import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

import { useFilter } from '../../../../hooks/useFilter'

export default function Filter() {    
    const {options, events, data, yearConfig} = useFilter()   
    
    const components = { DropdownIndicator: null}

  return (
    <>
        <div className='container-fluid shadow-sm bg-body-tertiary'>
            <div className='row'>
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
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="id-slope" className='fw-semibold'>Vertiente</label>
                        <Select                    
                            isMulti
                            options={options.optionsVertientes}
                            name="colors"                    
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={events.selectSlope}
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
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="id-slope" className='fw-semibold'>Estatus</label>
                        <Select                    
                            isMulti
                            options={options.optionsStatus}
                            name="colors"                    
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={events.selectStatus}
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
                            <button type="button" className="btn btn-black btn-sm fw-semibold" onClick={events.clickConsultar}>
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
