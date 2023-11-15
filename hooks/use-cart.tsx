import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem } from '@/types'
import { toast } from 'react-hot-toast'

interface CartStore {
    items: CartItem[]
    addItem: (data: CartItem) => void
    minusOneItemWithSameSize: (data: CartItem) => void
    plusOneItemWithSameSize: (data: CartItem) => void
    removeAllItemsWithSameSize: (data: CartItem) => void
    removeAll: () => void
}
// localStorage
const useCart = create(
    persist<CartStore>((set)=>({
        // by default, cartItems is empty
        items:[],

        // 若添加的是同一个物品的同一个尺码，只需在items里找到那个item，把num+=1
        // 若不是，则创建一个新的item在items里
        addItem:(data: CartItem)=>{
            
            set((state)=>{
                const existingItem= state.items.find((item)=> item.product.id == data.product.id && item.size === data.size)

                if(existingItem){
                    return{
                        items: state.items.map((item)=> item.product.id == data.product.id && item.size === data.size? {...item, num:item.num+1} : item)
                    }
                }

                return {
                    items:[...state.items, data]
                }
            })
            toast.success('Item added to cart')
        },
        
        // 此id应该为这个cartItem所对应的product的id
        // 若cartItem的数量有两个及以上，只数量减去1
        // 若cartItem的数量为1，直接删除这个item
        minusOneItemWithSameSize:(data: CartItem) => {
            set((state)=>{
                const existingItem= state.items.find((item)=> item.product.id == data.product.id && item.size === data.size)

                if(existingItem!.num==1){
                    return {
                        items:state.items.filter((item)=> item !== existingItem)
                    }
                } else{
                    let updatedItems= state.items.map((item)=>{
                        if (item== existingItem){
                            return {...item, num: item.num-1}
                        }
                        return item
                    })

                    return {
                        items:updatedItems
                    }
                }
            })
            toast.success('Item removed from the cart')
        },

        // 数量加1
        plusOneItemWithSameSize:(data: CartItem) => {
            set((state)=>{
                const existingItem= state.items.find((item)=> item.product.id == data.product.id && item.size === data.size)

                let updatedItems= state.items.map((item)=>{
                    if (item== existingItem){
                        return {...item, num: item.num+1}
                    }
                    return item
                })

                return {
                    items:updatedItems
                }
            })
            toast.success('Item added to the cart')
        },

        // 把同一个物品,同一个尺码的全部删除
        removeAllItemsWithSameSize:(data: CartItem) => {
            set((state)=>{
                const existingItem= state.items.find((item)=> item.product.id == data.product.id && item.size === data.size)

                return {
                    items:state.items.filter((item)=> item.product.id !== data.product.id)
                }
            })
            toast.success('Item removed from the cart')
        },


        //全部删除
        removeAll:() =>set({items:[]})
    }), {
        name:'cart-storage',
        storage:createJSONStorage(()=>localStorage)
    })
)

export default useCart