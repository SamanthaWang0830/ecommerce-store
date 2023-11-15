'use client'

import { ShoppingBag } from "lucide-react"
import Button from "./ui/button"
import { useEffect, useState } from "react"
import useCart from "@/hooks/use-cart"
import { useRouter } from "next/navigation"

const NavBarActions=()=>{
    // the cart is going to use localStorage to reserve the amount of the item in the cart 
    const [isMounted, setIsMounted]= useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])

    const cart= useCart()
    const router= useRouter()

    if(!isMounted){
        return null
    }

    let itemNum= cart.items.reduce((acc,cur)=> acc+cur.num , 0)

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button 
                className="flex items-center rounded-full bg-black px-4 py-2"
                onClick={()=>router.push('/cart')}
            >
                <ShoppingBag color="white" size={20}/>
                <span className="ml-2 text-sm font-medium text-white">{itemNum}</span>
            </Button>
        </div>
    )
}
export default NavBarActions