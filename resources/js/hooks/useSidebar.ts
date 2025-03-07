import { MouseEvent, useEffect, useState } from 'react'
import { useSidebarStore } from '../store/sidebar'
import {removeClase} from '../utils'

export function useSidebar() {
    const {claseMinimize, minimize, firstToggle, setMinimize, setFirstToggle, addClaseMinimize, removeClaseMinimize} = useSidebarStore();

	const [classToggle, setClassToggle] = useState<string>('btn btn-toggle toggle-sidebar');

	const [iconToggle, setIconToggle] = useState<string>('gg-menu-right');

	const [sideNavToggler, setSideNavToggler] = useState({
		clase:'sidenav-toggler',
		open:false,
	});

	const [topBarToggler, setTopBarToggler] = useState({
		clase:'topbar-toggler more',
		open:false,
	});

    useEffect(() => {
		//setSideNavToggler({...sideNavToggler, open:true})

		if (claseMinimize.split(' ').includes('sidebar_minimize')) {
			setMinimize(1);
		}
		
		setFirstToggle(true);
	}, [claseMinimize]);

    const addClase = (clases: string[], clase: string, indice: number = -1): string => {
		indice > 0 ? clases[indice] = clase : clases.push(clase);

		return clases.join(' ');
	}

    const handlerMouseEnter = (e: MouseEvent<HTMLElement>) => {	
		if (minimize == 1 && !firstToggle) {
			addClaseMinimize('sidebar_minimize_hover');						
			setFirstToggle(true);		
		} else {
			removeClaseMinimize('sidebar_minimize_hover');						
		}
	}

	const handlerMouseLeave = (e: MouseEvent<HTMLElement>) => {
		if (minimize == 1 && firstToggle) {
			removeClaseMinimize('sidebar_minimize_hover');	
			setFirstToggle(false);		
		}
	}

	const clickSideNavToggler = (e: MouseEvent<HTMLButtonElement>) => {
		if (sideNavToggler.open) {
			document.getElementsByTagName('html')[0].classList.remove('nav_open');
			setSideNavToggler({
				clase:removeClase(sideNavToggler.clase.split(' '), 'toggled'),
				open:false
			});
		} else {
			document.getElementsByTagName('html')[0].classList.add('nav_open');
			setSideNavToggler({
				clase:addClase(sideNavToggler.clase.split(' '), 'toggled'),
				open:true
			});
		}
	}

	const clickToggleSidebar = (e: MouseEvent<HTMLButtonElement>) => {
		let $claseToggle = classToggle;

		if (minimize === 1) {
			$claseToggle = removeClase(classToggle.split(' '), 'toggled');
			removeClaseMinimize('sidebar_minimize');
			setIconToggle('gg-menu-right');	
			setMinimize(0);
		} else {
			$claseToggle = addClase(classToggle.split(' '), 'toggled', 3);
			addClaseMinimize('sidebar_minimize');
			setIconToggle('gg-more-vertical-alt');
			setMinimize(1);
		}
		
		setClassToggle($claseToggle);
	}

	const clickTopBar = (e: MouseEvent<HTMLButtonElement>) => {
		if (topBarToggler.open) {
			document.getElementsByTagName('html')[0].classList.remove('topbar_open');
			setTopBarToggler({
				clase:removeClase(topBarToggler.clase.split(' '), 'toggled'),
				open:false
			});
		} else {
			document.getElementsByTagName('html')[0].classList.add('topbar_open');
			setTopBarToggler({
				clase:addClase(topBarToggler.clase.split(' '), 'toggled'),
				open:true
			});
		}
	}

    return {
        classToggle, iconToggle, sideNavToggler, topBarToggler,
        handlerMouseEnter,
        handlerMouseLeave,
        clickSideNavToggler,
        clickToggleSidebar,
        clickTopBar
    }
}