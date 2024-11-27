import './bootstrap';

const removeClase = (clases, clase) => {
    const resulado = clases.filter($clase => $clase!==clase);

    return resulado.join(' ');
}

const addClase = (clases, clase) => {
    if (clase==='' || clases.includes(clase)) {
        return clases.join(' ');
    }
    clases.push(clase);
    return clases.join(' ');
}