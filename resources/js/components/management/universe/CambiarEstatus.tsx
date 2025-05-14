import React from 'react'
import { useCatalogStore } from '../../../store/catalogStore'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import type { Option } from '../../../types'
import Select from 'react-select'

type EstatusProps = {
  options:Option[]
}
export default function CambiarEstatus() {
  const setEstatus = useConflictStore(state => state.setEstatus);
  const {getOptionsEstatus} = useCatalogStore();

  const selectedStatus = (e) => {
    setEstatus(e as Option)
  }

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
          onChange={selectedStatus}
      />
    </>
  )
}
