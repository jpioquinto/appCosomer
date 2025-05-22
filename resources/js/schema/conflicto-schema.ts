import { z } from 'zod'

export const ResponseLoadFile = z.object({
        'solicitud':z.boolean(),
        'message':z.string(),
        'path':z.optional(z.string()).nullable(),
        'url':z.optional(z.string()).nullable()
})

export const ValueCapture = z.object({
        'value':z.string().or(z.number()).or(z.array(z.string())).or(z.array(z.number())),
        'docs':z.optional(z.array(z.string())),
        'id':z.optional(z.number()),
        'type':z.string()
})

export const Parametro = z.object({
        'id':z.number(),
        'etapaId':z.number(),
        'parametro':z.string(),
        'orden':z.number(),
        'ponderacion':z.string(),
        'calificable':z.number(),
        'requiereDoc':z.number(),
        'accion':z.optional(z.string()).nullable(),
        'definicion':z.optional(z.string()).nullable(),
        'premisaId':z.optional(z.string()).nullable(),
        'keyParam':z.optional(z.string()).nullable(),
        'captura':z.optional(ValueCapture).nullable(),
        'capturando':z.optional(z.boolean()).nullable(),
        'multipleCap':z.optional(z.number()).nullable(),
        'capturaId':z.optional(z.number()).nullable(),
        'validado':z.optional(z.number()).nullable(),
})

export const Parametros = z.array(Parametro)

export const Etapa = z.object({
        id:z.number(),
        etapa:z.string(),
        ponderacion:z.number(),
        orden:z.number(),
        estatus:z.number(),
        expanded:z.optional(z.boolean()).nullable(),
        collapse:z.optional(z.string()).nullable(),
        capturas:z.optional(Parametros).nullable()        
})

export const Etapas = z.array(Etapa)

export const RegistroSchema = z.object({
        id:z.number(),
        fecha:z.optional(z.string()).nullable(),
        folio:z.optional(z.string()).nullable(),
        edoId:z.number(),
        munpioId:z.number(),
        asunto:z.optional(z.string()).nullable(),    
        predio:z.optional(z.string()).nullable(),    
        promovente:z.optional(z.string()).nullable(),    
        contraparte:z.optional(z.string()).nullable(),    
        vertienteId:z.optional(z.number()).nullable(),
        puebloIndigena:z.optional(z.string()).nullable(),
        nombreRegSoc:z.optional(z.string()).nullable(),
        anioFiscal:z.optional(z.string()).nullable(),
        supconflicto:z.optional(z.string()).nullable(),
        supatendida:z.optional(z.string()).nullable(),
        numBeneficiario:z.optional(z.number()).nullable(),
        regSocialId:z.optional(z.number()).nullable(),
        estatus:z.number(),
        estatusId:z.optional(z.number()).nullable(),
        observaciones:z.optional(z.string()).nullable(),
        orgInvolucradaId:z.optional(z.number()).nullable(),
        problematica:z.optional(z.string()).nullable(),
        municipio:z.optional(z.string()).nullable(),
        estado:z.optional(z.string()).nullable(),
        vertiente:z.optional(z.string()).nullable(),        
        vertAcronimo:z.optional(z.string()).nullable(),        
        regimen:z.optional(z.string()).nullable(),
        descEstatus:z.optional(z.string()).nullable(),
        orgInvolucrada:z.optional(z.string()).nullable(),
})

export const RegistrosSchema = z.array(RegistroSchema)
