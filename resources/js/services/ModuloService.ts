import { Menu, ModuloSchema } from '../schema/modulo-schema'

export async function getModulos() {
    try {
        const response =  await axios.get('api/permisos');
        //console.log(response.status)
        if (response.status==200) {
            const result = ModuloSchema.safeParse(response.data?.listado);
            
            return result.success ? result.data : []
        }
    } catch(error) {
        console.log(error);        
    }        
}

export async function getMenu() {
    try {
        const response =  await axios.get('api/menu');
        //console.log(response.status)
        if (response.status==200) {
            const result = Menu.safeParse(response.data?.menu);
            
            return result.success ? result.data : []
        }
    } catch(error) {
        console.log(error);        
    }        
}