import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params'
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
import Image from 'next/image';
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCart } from 'lucide-react';

import ProductSlider from '@/components/productSlider/ProductSlider';
import AddProductToCart from '@/components/addProductToCart/AddProductToCart';
import AddToWishlist from '@/components/addToWishlist/addToWishlist';
import AddToCart from '@/components/addProductToCart/AddProductToCart';

export default async function ProductDetails({ params }: { params: Params }) {
    let { productId } = await params
    console.log(productId);
    
    const response = await fetch(`${process.env.API_URL}/products/` + productId)
    const { data: product }: { data: ProductI } = await response.json();
    // console.log(product);
    
    return (
        <>
            <Card className='grid md:grid-cols-2 items-center w-3/5 mx-auto mt-5'>
                <div className='p-3'>
                    <ProductSlider images={ product.images} altContent={product.title} />
                </div>
                <div>
                    <CardHeader>
                        <CardDescription className='font-light'>{product.brand.name}</CardDescription>
                        <CardTitle className='font-bold'>{product.title}</CardTitle>
                        <CardDescription className='font-bold mt-5'>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className='mt-5'>{product.category.name}</CardDescription>
                        <div className='flex gap-1'>
                            <MyStarIcon/>
                            <MyStarIcon/>
                            <MyStarIcon/>
                            <MyStarIcon />
                            <p>({product.ratingsQuantity})</p>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <p className='font-bold'>{product.price} EGP</p>
                            <p className='font-bold'>Quantity: {product.quantity}</p>
                        </div>
                    </CardContent>
                    <CardFooter className='gap-2 mt-5 justify-center items-center'>
                        <AddToCart productId={product.id} />
                        <AddToWishlist productId={product.id} />
                    </CardFooter>
                    
                </div>
            </Card>
        </>
    )
}
