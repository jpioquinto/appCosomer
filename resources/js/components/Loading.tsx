import Spinner from './Spinner'
import { useLoadingStore } from '../store/loading'
import type { LoadingProps } from '../types'
import React from 'react';

export default function Loading({texto, omitCancel}: LoadingProps) {
    const  {load} = useLoadingStore();

    return (
        <div className={load.clase}>
            <Spinner texto={texto} omitCancel={omitCancel}/>
        </div>
    )
}