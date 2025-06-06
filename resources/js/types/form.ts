export type DraftFormConflicto = {
    id?:number,
    fecha:string,
    edoId?:string|null,
    munpioId?:string|null,
    asunto:string,    
    predio?:string|null,    
    promovente:string,    
    contraparte:string,    
    vertienteId:string,
    ha:number,
    area:number,
    ca:number,
    puebloIndigena?:string|null,
    nombreRegSoc?:string|null,
    numBeneficiario:number,
    anioFiscal?:number,
    regSocialId:string,    
    estatusId:string,
    observaciones?:string|null,
    orgInvolucradaId?:string|null,
    problematica?:string|null,
}