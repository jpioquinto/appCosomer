import { create } from 'zustand'

type configState = {
    intervalId:number,
    interceptor:number,
    getInterceptor:() => number,
    getIntervalId:() => number,
    setIntervalId:(intervalId:number) => void,
    setInterceptor:(interceptor:number) => void
}
export const useConfigStore = create<configState>((set, get) => ({
    interceptor:0,
    intervalId:0,
    setIntervalId:(intervalId) => set({intervalId}),
    setInterceptor:(interceptor) => set({interceptor}),
    getInterceptor:() => get().interceptor,
    getIntervalId:() => get().intervalId        
}))