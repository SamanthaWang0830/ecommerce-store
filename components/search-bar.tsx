'use client'

import { Input } from "@/components/ui/input"
import Button from "./ui/button"
import { useRouter } from "next/navigation"
import useSearchBar from "@/hooks/use-searchBar"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from "./ui/form"

const SearchBar=()=>{
    const router= useRouter()

    const {addKeyword}= useSearchBar()

    const form = useForm({
        defaultValues:{keyword: ''}
    });

    const onSubmit=(data: any)=>{
        console.log(data.keyword)
        addKeyword(data.keyword)
        router.push('/search')
    }


    return(
        <div className="flex">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                            control={form.control}
                            name="keyword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            type="text" 
                                            className="h-9" 
                                            placeholder="Find your gear..." 
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                    />

                    <Button 
                        type="submit" 
                        className="bg-slate-100 font-medium text-sm text-slate-500 px-4 " 
                    >
                        Search
                    </Button>
                </form>

            </Form>
            
        </div>
    )
}

export default SearchBar