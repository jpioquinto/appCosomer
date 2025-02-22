import React from 'react'
import { useCatalogStore } from '../../../store/catalogStore'
import type { Option } from '../../../types'
import Select from 'react-select'

type EstatusProps = {
  options:Option[]
}
export default function CambiarEstatus() {
  const {getOptionsEstatus} = useCatalogStore();

  return (
    <>
      <Select 
        placeholder='Seleccione el estatus'
        options={getOptionsEstatus()} 
        menuPortalTarget={document.querySelector('.swal2-container')}
        styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                textAlign: 'left',
              })
          }}
      />
    </>
  )
}
