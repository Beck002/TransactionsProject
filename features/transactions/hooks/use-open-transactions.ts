
import { create } from "zustand"; 


type OpenTransactionsState = {
    id?:string; 
    isOpen: boolean; 
    onOpen: (id:string)=> void; 
    onClose: ()=> void; 
}
 
export const useOpenTransactions = create<OpenTransactionsState>( (set) =>({
    isOpen: false,
    onOpen: (id:string)=> set({isOpen: true, id}), 
    onClose: ()=> set({isOpen: false, id: undefined}) 
 
}))

