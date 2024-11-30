export const removeClase = (clases: string[], clase: string) : string => {
    const resulado = clases.filter($clase => $clase!==clase);

    return resulado.join(' ');
}

export const addClase = (clases:string[], clase:string): string => {
    if (clase==='' || clases.includes(clase)) {
        return clases.join(' ');
    }
    clases.push(clase);
    return clases.join(' ');
}