
import Container from '@/components/ui/container'
import ProductCard from '@/components/ui/product-card'
import NoResults from '@/components/ui/no-result'
import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import Billboard from '@/components/billboard';

export const revalidate = 0

interface CategoryPageProps {
    params: {
      categoryId: string
    }
}
  
// @ts-ignore
const CategoryPage: React.FC<CategoryPageProps> = async({params})=>{
    const products=await getProducts({
        categoryId:params.categoryId
    })
    const category= await getCategory(params.categoryId)


    return(
        <div className="bg-white">
            <Container>
                <Billboard data={category.billboard}/>
                <div className='px-4 sm:px-6 lg:px-8 pb-24'>
                    <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
                        <div className='hidden lg:block'>
                        </div>
                    </div>
                    <div className='mt-6 lg:col-span-4 lg:mt-0'>
                        {products.length==0 && <NoResults/>}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            { 
                                products.map((item)=>(
                                    <ProductCard
                                        key={item.id}
                                        data={item}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CategoryPage