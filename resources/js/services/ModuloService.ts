import { ModuloSchema } from '../schema/modulo-schema'

export function getModulos() {
        const response =  axios.post('api/permisos');
        console.log(response.status)
        if (response.status==200) {
            const result = ModuloSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        } 

        return []
}