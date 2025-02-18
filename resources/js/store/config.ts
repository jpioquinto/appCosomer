import { create } from 'zustand'

type configState = {
    interceptor:object | null,
    getInterceptor:() => object | null
    setInterceptor:(interceptor:object) => void
}
export const useConfigStore = create<configState>((set, get) => ({
    interceptor:null,
    setInterceptor:(interceptor) => set({interceptor}),
    getInterceptor:() => get().interceptor        
}))