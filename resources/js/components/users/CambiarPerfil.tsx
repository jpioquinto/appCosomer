import React from 'react'
import Select from 'react-select'
import { Option } from '../../types'
import { useUserStore } from '../../store/user'

type PerfilProps = {
  options:Option[]
}

export default function CambiarPerfil({options}: PerfilProps) {

  const {setPerfilSelected} = useUserStore()

  const selectedPerfil = (e) => {
    setPerfilSelected(e as Option)
  }

  return (
    
      <Select 
        placeholder='Seleccione el perfil'
        options={options} 
        menuPortalTarget={document.querySelector('.swal2-container')}
        styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                textAlign: 'left',
              })
          }}
        onChange={selectedPerfil}
      />
    
  )
}
