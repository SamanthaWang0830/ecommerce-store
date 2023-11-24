import { create } from 'zustand'

interface SearchBarStore{
    word: string
    addKeyword:(data:string)=>void
}

const useSearchBar = create<SearchBarStore>((set)=>({
    word:'',
    addKeyword:(data:string)=>set((state)=>({word: data}))
}))

export default useSearchBar