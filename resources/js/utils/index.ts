import type { Acciones, Accion } from '../types'
import { toast } from 'react-toastify'

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

export const tienePermiso = (acciones: Acciones, permisoId:Accion['id']) => {
    const permiso = acciones.filter(accion => accion.id === permisoId)

    return permiso.length>0
}

export const notificacion = (message:string, $type:string, $time:number = 300) => {
    toast[$type](message, {
        position:"bottom-right",
        theme:"colored"
    });
}

export const isInteger = (value: string): boolean => {
    var typeInt = /^[-]?[0-9]+$/;
    return typeInt.test(value);
}

export const isNumeric = (value: string): boolean => {
    var typeFloat =  /^[-]?[0-9]+\.[0-9]+$/;
    return (typeFloat.test(value) || isInteger(value));
}

export const isNumericPositive = (value: string): boolean => {
    var typeFloat =  /^[0-9]+\.[0-9]+$/;
    var typeInt   = /^[0-9]+$/;
    return (typeFloat.test(value) || typeInt.test(value));
}

export const makeHash = (longitud:number = 32): string =>  {

    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash     = "";

    for (let i = 0; i < longitud; i++) {
        hash += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return hash;
};