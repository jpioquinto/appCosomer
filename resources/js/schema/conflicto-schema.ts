import { z } from 'zod'

export const RegistroSchema = z.object({
        id:z.number(),
        fecha:z.string(),
        edoId:z.number(),
        munpioId:z.number(),
        promovente:z.string(),    
        contraparte:z.string(),    
        vertienteId:z.number(),
        supConflictoId:z.number(),
        supAtendidaId:z.number(),
        numBeneficiario:z.number(),
        regSocialId:z.number(),
        estatus:z.number(),
        estatusId:z.number(),
        sintEstatus:z.string(),
        orgInvolucradaId:z.number(),
        problematica:z.string(),
        municipio:z.string(),
        estado:z.string(),
        vertiente:z.string(),
        supConflicto:z.string(),
        supAtendida:z.string(),
        regimen:z.string(),
        descEstatus:z.string(),
        orgInvolucrada:z.string(),
})

export const RegistrosSchema = z.array(RegistroSchema)