import { ProductI } from '@/interfaces'
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import { Button } from '@/components/ui/button'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import AddProductToCart from '@/components/addProductToCart/AddProductToCart'
import AddToWishlist from '@/components/addToWishlist/addToWishlist'
import AddToCart from '@/components/addProductToCart/AddProductToCart'

export default async function Products() {
    const response = await fetch(`${process.env.API_URL}/products`)
    
    const { data: products }: { data: ProductI[] } = await response.json()
    // console.log(products);
    
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
                {products.map((product) => <div className='' key={product._id}>
                    <Card className=''>
                        <Link href={"/products/" + product._id}>
                            <CardHeader>
                                <Image className='w-full' src={product.imageCover} alt={product.title} width={300} height={300} />
                                <CardDescription>{product.brand.name}</CardDescription>
                                <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                                <CardDescription>{product.category.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex'>
                                    <MyStarIcon />
                                    <MyStarIcon />
                                    <MyStarIcon />
                                    <MyStarIcon />
                                    <MyStarIcon />
                                    <p>{product.ratingsAverage}</p>
                                </div>
                                <p className='pt-1'>Price : <span className='font-bold'>{product.price}</span>EGP</p>
                            </CardContent>
                        </Link>
                        
                        <CardFooter className='gap-2 mt-5'>
                            <AddToCart productId={product.id} />
                            <AddToWishlist productId={product.id} />
                        </CardFooter>

                    </Card>
                </div>)}
            </div>
        </>
    )
}
