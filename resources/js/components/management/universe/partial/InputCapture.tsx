import React, {useState, ChangeEvent, KeyboardEvent} from 'react'
import type { InputType } from '../../../../types/conflicto'

type InputProps = InputType & {
    index:number,
    endCapture:() => void,
    update:(value:string, index:number) => void
}

export default function InputCapture({inputType, value, index, update, endCapture}: InputProps) {
    const [capture, setCaptura] = useState<string|number>(value!)

    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            capture ? endCapture() : undefined
        }
    }

    const changeInputCapture = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()      
        setCaptura(e.target.value)
        update(e.target.value, index)
    }

  return (
    <>
        <input type={inputType} className='form-control mb-1' value={capture} onChange={changeInputCapture} onKeyDown={handlerKeyDown} />
    </>
  )
}
