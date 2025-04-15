import { create } from 'zustand'

type configState = {
    intervalId:number,
    interceptor:object | null,
    getInterceptor:() => object | null,
    getIntervalId:() => number,
    setIntervalId:(intervalId:number) => void,
    setInterceptor:(interceptor:object) => void
}
export const useConfigStore = create<configState>((set, get) => ({
    interceptor:null,
    intervalId:0,
    setIntervalId:(intervalId) => set({intervalId}),
    setInterceptor:(interceptor) => set({interceptor}),
    getInterceptor:() => get().interceptor,
    getIntervalId:() => get().intervalId        
}))