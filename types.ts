export interface Billboard{
    id: string
    label: string
    imageUrl: string
}

export interface Category{
    id:string
    name:string
    billboard:Billboard
}

export interface Product{
    id:string
    category: Category
    name:string
    price: string
    isFeatured: boolean
    images: Image[]
    stockOfSmallSize: number
    stockOfMediumSize:number
    stockOfLargeSize: number
    isArchived: boolean
}


export interface CartItem{
    product: Product
    size: string
    num: number
}

export interface Image{
    id:string
    url:string
}




export const sizes=[
    {
        id:'s',
        name:'S'
    },
    {
        id:'m',
        name:'M'
    },
    {
        id:'l',
        name:'L'
    },

]
