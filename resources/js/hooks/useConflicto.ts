import { z } from 'zod'
import { useCatalogStore } from '../store/catalogStore'

const schema = z.object({
    fecha:z.string().min(10, {message: 'Seleccione una Fecha válida.'}),
    edoId:z.string().min(1, {message: 'Seleccione una Entidad Federativa.'}),
    munpioId:z.optional(z.string()).nullable(),
    promovente:z.string().min(6, {message: 'Ingrese el Promovente.'}),    
    contraparte:z.string().min(6, {message: 'Ingrese la Contraparte.'}),    
    vertienteId:z.string().min(1, {message: 'Seleccione la Vertiente.'}),
    numBeneficiario:z.preprocess(
            (dato) => parseInt(z.string().parse(dato), 10),
            z.number().min(0)
    ),
    regSocialId:z.string().min(1, {message: 'Seleccione el Régimen Social.'}),
    estatusId:z.string().min(1, {message: 'Seleccione el Estatus.'}),
    sintEstatus:z.string().min(6, {message: 'Ingrese la Sintésis del Estatus.'}),
    orgInvolucradaId:z.string().min(1, {message: 'Seleccione la organización involucrada.'}),
    problematica:z.optional(z.string()).nullable(),
    ha:z.preprocess(
        (dato) => parseInt(z.string().parse(dato), 10),
        z.number().min(0)
    ),
    area:z.preprocess(
        (dato) => parseInt(z.string().parse(dato), 10),
        z.number().min(0)
    ),
    ca:z.preprocess(
        (dato) => parseFloat(z.string().parse(dato)),
        z.number().min(0)
    ),
    haa:z.preprocess(
        (dato) => parseInt(z.string().parse(dato), 10),
        z.number().min(0)
    ),
    areaa:z.preprocess(
        (dato) => parseInt(z.string().parse(dato), 10),
        z.number().min(0)
    ),
    caa:z.preprocess(
        (dato) => parseFloat(z.string().parse(dato)),
        z.number().min(0)
    )
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