import React from 'react'
import Select from 'react-select'
import { Option } from '../../types'
import { useUserStore } from '../../store/user'

type URProps = {
  options:Option[]
}

export default function CambiarUR({options}: URProps) {

    const {setUrSelected} = useUserStore()

    const selectedUR = (e) => {
      setUrSelected(e as Option)
    }
  return (
    
      <Select 
        placeholder='Seleccione la Unidad Responsable'
        options={options} 
        menuPortalTarget={document.body}
        styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                textAlign: 'left',
              })
          }}
        onChange={selectedUR}
      />
    
  )
}
