import { z } from 'zod'
import { useCatalogStore } from '../store/catalogStore'

const schema = z.object({
    fecha:z.string().min(10, {message: 'Seleccione una Fecha válida.'}),
    edoId:z.string().min(1, {message: 'Seleccione una Entidad Federativa.'}),
    munpioId:z.optional(z.string()).nullable(),
    asunto:z.string().min(6, {message: 'Ingrese un nombre de asunto valido.'}),
    predio:z.optional(z.string().min(2, {message: 'Ingrese un nombre de predio valido.'})),    
    nombreRegSoc:z.optional(z.string()).nullable(),    
    anioFiscal:z.optional(z.coerce.number().min(0, {message:'Ingrese una dato numérico.'})),
    puebloIndigena:z.optional(z.string()).nullable(), 
    promovente:z.string().min(6, {message: 'Ingrese el Promovente.'}),    
    contraparte:z.string().min(6, {message: 'Ingrese la Contraparte.'}),    
    vertienteId:z.string().min(1, {message: 'Seleccione el Tipo de Conflicto.'}),
    numBeneficiario:z.coerce.number().min(0, {message:'Ingrese una dato numérico mayor o igual a 0'}),
    regSocialId:z.string().min(1, {message: 'Seleccione el Régimen Social.'}),
    estatusId:z.string().min(1, {message: 'Seleccione el Estatus.'}),
    sintEstatus:z.optional(z.string()).nullable(),
    orgInvolucradaId:z.optional(z.string()).nullable(),
    problematica:z.optional(z.string()).nullable(),
    ha:z.coerce.number().min(0, {message:'Ingrese una dato numérico mayor o igual a 0'}),
    area:z.coerce.number().min(0, {message:'Ingrese una dato numérico mayor o igual a 0'}),
    ca:z.coerce.number({required_error: 'Se requiere una cantidad numérica positiva.', invalid_type_error: 'Ingrese una cantidad numérica positiva.'})
        .min(0, {message:'Ingrese una dato numérico mayor o igual a 0'}),
    haa:z.coerce.number().min(0, {message:'Ingrese una dato numérico mayor o igual a 0'}),
    areaa:z.coerce.number().min(0, {message:'Ingrese una dato numérico mayor o igual a 0'}),
    caa:z.coerce.number({required_error: 'Se requiere una cantidad numérica positiva.', invalid_type_error: 'Ingrese una cantidad numérica positiva.'})
        .min(0, {message:'Ingrese una dato numérico mayor o igual a 0'})
})

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],            
        [{ 'align': [] }],
        ['link'],
        ['clean']
      ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent','align',
    'link'
]

export function useConflicto() {
    const {getVertientes, getRegimenes, getEstatus, getOrganizaciones, 
            listVertientes, listRegimenes, listEstatus, listOrganizaciones} = useCatalogStore();
    return {
        catalog: {
            getVertientes, getRegimenes, getEstatus, getOrganizaciones,listVertientes, listRegimenes, listEstatus, listOrganizaciones 
        },
        form: {
            schema            
        },
        config: {
            modules,
            formats
        }
    }
}