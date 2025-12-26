import { CategoryI, ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import { Button } from '@/components/ui/button'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import AddProductToCart from '@/components/addProductToCart/AddProductToCart'
import AddToWishlist from '@/components/addToWishlist/addToWishlist'

export default async function CategoryDetails({ params }: { params: Params }) {
    const { categoryId } = await params
    // console.log(categoryId);

    const categoryRes = await fetch(`${process.env.API_URL}/categories/${categoryId}`)
    const { data: category }: { data: CategoryI } = await categoryRes.json();
    // console.log(category);

    const productRes = await fetch(`${process.env.API_URL}/products?category=${categoryId}`)
    const { data: products }: { data: ProductI[] } = await productRes.json()
    
    return (
        <>
            <h1 className='font-bold text-3xl mt-5'>{category.name}</h1>
            <p className='my-3 text-gray-500'>Products from this brand</p>
            {products.length === 0 ?
                <div className='flex justify-center items-center vh-[40vh]'>
                    <p className="text-gray-500 text-lg font-medium">No products found in this category.</p>
                </div>
                :
                <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {products.map((product) => <div key={product._id}>
                        <Card>
                            <Link href={"/products/" + product._id}>
                                <CardHeader>
                                    <Image className='w-full' src={product.imageCover} alt={product.title} width={300} height={300} />
                                    <CardDescription>{product.brand.name}</CardDescription>
                                    <CardTitle className='text-xl'>{product.title.split(" ", 4).join(" ")}...</CardTitle>
                                    <CardDescription>{product.category.name}</CardDescription>
                                    <div className='flex'>
                                        <MyStarIcon />
                                        <MyStarIcon/>
                                        <MyStarIcon/>
                                        <MyStarIcon/>
                                        <MyStarIcon />
                                        <p className='ms-3'>({product.ratingsQuantity})</p>
                                    </div>
                                    <p className='pt-1 font-bold text-xl'>EGP <span className='font-bold'>{product.price}</span></p>
                                </CardHeader>
                            </Link>
                            <CardFooter className='gap-2'>
                                <AddProductToCart productId={product.id} />
                                <AddToWishlist productId={product.id} />
                            </CardFooter>
                        </Card>
                    </div>)}
                </div>
                }
            
        </>
    )
}
