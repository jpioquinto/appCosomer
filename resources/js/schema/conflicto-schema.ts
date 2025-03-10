import { z } from 'zod'

export const RegistroSchema = z.object({
        id:z.number(),
        fecha:z.optional(z.string()).nullable(),
        folio:z.string(),
        edoId:z.number(),
        munpioId:z.number(),
        asunto:z.optional(z.string()).nullable(),    
        predio:z.optional(z.string()).nullable(),    
        promovente:z.optional(z.string()).nullable(),    
        contraparte:z.optional(z.string()).nullable(),    
        vertienteId:z.optional(z.number()).nullable(),
        anioFiscal:z.optional(z.number()).nullable(),
        supconflicto:z.optional(z.string()).nullable(),
        supatendida:z.optional(z.string()).nullable(),
        numBeneficiario:z.optional(z.number()).nullable(),
        regSocialId:z.optional(z.number()).nullable(),
        estatus:z.number(),
        estatusId:z.optional(z.number()).nullable(),
        sintEstatus:z.optional(z.string()).nullable(),
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