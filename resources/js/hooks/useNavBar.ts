import { useState } from 'react'

import type { ModuloSchema } from '../schema/modulo-schema'

const moduloState  = [{
    acciones:[],
    clase:'',
    controlador:'',
    descripcion:'',
    icono:'',
    id:0,
    nodo_padre:0,
    nombre:'',
    orden:0
}]

export default function useNavBar() {

    const [modulos, setModulos] = useState<ModuloSchema>(moduloState)

    const obtenerModulos = async () => {
        try {

        } catch (error) {

        }
    }

}