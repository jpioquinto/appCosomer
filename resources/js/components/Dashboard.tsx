import React, {useEffect} from "react"

import { useLoadingStore } from "../store/loading"
import Loading from './Loading'

export default function Dashboard() {
    const {setIsLoading, loadShow, loadHidden} = useLoadingStore();
    useEffect(() => {
        /*setIsLoading(true)
        loadShow()*/
    }, [])

    return (
        <>
            <h1>Hola desde Dashboard :)</h1>
            <Loading />
        </>
    )
}