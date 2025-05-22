import { create } from 'zustand'

type CaptureState = {
    capture: string|number|(number | string)[],
    setCaptura: (capture: string|number|(number | string)[]) => void,
    getCaptura: () => string|number|(number | string)[]
}

export const useCaptureStore = create<CaptureState>((set, get) => ({
    capture:'',
    setCaptura:(capture) => set({capture}),
    getCaptura:() => get().capture
}))