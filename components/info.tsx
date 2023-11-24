'use client'

import { CartItem, Product } from "@/types"
import Currency from "./ui/currency"
import Button from "./ui/button"
import { ShoppingCart } from "lucide-react"
import useCart from "@/hooks/use-cart"
import { useState } from "react"
import { cn } from "@/lib/utils"


interface InfoProps{
    data: Product
}

const Info: React.FC<InfoProps>=({data})=>{
    const [selectedSize, setSelectedSize] = useState('');
    const [open, setOpen]= useState(false);

    const [stock, setStock]=useState<number>()

    const handleSizeChange = (size:string) => {
        setSelectedSize(size);
        setOpen(true)
        if(size=='s'){
            setStock(data.stockOfSmallSize)
        }else if(size=='m'){
            setStock(data.stockOfMediumSize)
        }else{
            setStock(data.stockOfLargeSize)
        }
    };


    const cart = useCart();

    // (product) data----> cartItem 
    const cartItem: CartItem={
        product: data,
        num:1,
        size: selectedSize
    }

    const onAddToCart = () => {
        cart.addItem(cartItem)
    }


    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center gap-x-4 mb-4">
                <h3 className="font-semibold text-black">Size:</h3>
                <div className="flex gap-4">
                    <div key='s' className="flex flex-col items-center">
                            <Button
                                className={cn(
                                    "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                                    selectedSize== 's' && 'bg-black text-white'
                                )}
                                onClick={()=>handleSizeChange('s')}
                                disabled={!data.stockOfSmallSize}
                            >
                                S
                            </Button>
                    </div>
                    <div key='m'  className="flex items-center">
                            <Button
                                className={cn(
                                    "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                                    selectedSize=='m' && 'bg-black text-white'
                                    
                                )}
                                onClick={()=>handleSizeChange('m')}
                                disabled={!data.stockOfMediumSize}
                            >
                                M
                            </Button>
                            
                    </div>
                    <div key='l'  className="flex items-center">
                            <Button
                                className={cn(
                                    "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                                    selectedSize== 'l' && 'bg-black text-white'
                                )}
                                onClick={()=>handleSizeChange('l')}
                                disabled={!data.stockOfLargeSize}
                            >
                                L
                            </Button>
                            
                    </div>
                </div>
            </div>
            {
                open && <span className="ml-10 ">{stock} in stock</span> 
            }
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2" disabled={selectedSize? false: true}>
                    Add To Cart
                    <ShoppingCart size={20} />
                </Button>
            </div>
        </div>
    )
}
export default Info