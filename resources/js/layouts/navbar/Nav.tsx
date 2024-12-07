
import { Menu, MenuItem } from '../../types'
import ItemNav from './ItemNav'
import useNavBar from '../../hooks/useNavBar'
import ItemInfoNav from './ItemInfoNav'

type Navrops = {
    menu:Menu,
    clase:string,
    nivel:number

}

export default function Nav({menu, clase, nivel}: Navrops){

    const {esModuloPadre} = useNavBar()
      
    return (
        <ul className={clase}>
            {
                menu.map((item:MenuItem) => (
                    item.ruta!=="INFORMATIVO"
                    ? <ItemNav item={item} nodoPadre={esModuloPadre(item.items as Menu, item.id)} nivel={nivel} key={item.id}/>                    
                    : <ItemInfoNav item={item} key={item.id}/> 
                ))
            }
        </ul>
    )
}