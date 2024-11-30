import Spinner from './Spinner'
import { useLoadingStore } from '../store/loading'

export default function Loading({texto, omitCancel}) {
    const  {load} = useLoadingStore();

    return (
        <div className={load.clase}>
            <Spinner texto={texto} omitCancel={omitCancel}/>
        </div>
    )
}