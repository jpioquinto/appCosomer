import Spinner from './Spinner'

export default function Loading({texto, omitCancel}) {
    return (
        <div className="loader-overlay loaded1">
            <Spinner texto={texto} omitCancel={omitCancel}/>
        </div>
    )
}