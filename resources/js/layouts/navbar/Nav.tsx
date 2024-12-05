
import { Menu, MenuItem } from '../../types'
import ItemNav from './ItemNav'
import useNavBar from '../../hooks/useNavBar'

import {useEffect} from 'react'
import ItemInfoNav from './ItemInfoNav'

type Navrops = {
    menu:Menu,
    clase:string

}

export default function Nav({menu, clase}: Navrops){

    const {esModuloPadre} = useNavBar()

    /*useEffect(()=> {
        generaMenu([...items])

        console.log(menu)
    }, [menu])   */
      
    return (
        <ul className={clase}>
            {
                menu.map((item:MenuItem) => (
                    item.ruta!=="INFORMATIVO"
                    ? <ItemNav item={item} nodoPadre={esModuloPadre(item.items as Menu, item.id)} key={item.id}/>                    
                    : <ItemInfoNav item={item} key={item.id}/> 
                ))
            }
        </ul>
    )
}