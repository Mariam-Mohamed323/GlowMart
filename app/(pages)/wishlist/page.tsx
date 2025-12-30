"use client"
import Loading from '@/app/loading'
import { WishlistContext } from '@/components/wishlistContext/wishlistContext'
import { WishlistResponse } from '@/interfaces'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { RemoveWishlistAction } from './_action/wishlist.action'
import { CartContext } from '@/components/context/CartContext'
import { AddToCartAction } from '../products/_action/addToCart.action'
import toast from 'react-hot-toast'

export default function Wishlist() {
    const { wishlistData, loading, getWishlist, setWishlistData } = useContext(WishlistContext)
    const [removingId, setRemovingId] = useState<string | null>(null)
    const { getCart } = useContext(CartContext)

    

useEffect(() => {
  if (
    !wishlistData ||
    !wishlistData.data ||
    typeof wishlistData.data[0] === "string"
  ) {
    getWishlist();
  }
}, [wishlistData]);

    
    async function removeWishlistItem(productId: string) {
        setRemovingId(productId);
        const data = await RemoveWishlistAction(productId)
        if (data.status == "success") {
            // setWishlistData(data)
            getWishlist()
        }
        setRemovingId(null)
    }
    
    return (
        <>
        {loading?<Loading/>:<div className='container mx-auto py-6 px-4'>
            <h1 className='text-3xl font-bold tracking-tight ms-5'>Your Wishlist</h1>
            <p className='text-muted-foreground mt-1 ms-5'>{wishlistData?.count} items in your wishlist</p>
                <div className='grid  gap-6 lg:items-start mt-6 w-[90%] mx-auto'>
                    
                    {wishlistData?.data?.map((product)=><div key={product.id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                        <Image src={product.imageCover} height={300} width={300} alt={product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />

                        <div className='flex-1'>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="">
                                    <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                        {product.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground mt-1'>
                                        {product.brand.name} - {product.category.name}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">
                                        EGP {product.price}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <button onClick={async () => {
                                    await AddToCartAction(product.id);
                                    await getCart();
                                    toast.success("Added to cart");
                                }}
                                >
                                    Add to Cart
                                </button>

                                <button onClick={()=>removeWishlistItem(product.id)} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center'>
                                    {removingId == product.id && <Loader className='animate-spin' />}
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>)}
                
            </div>
        </div>}
        </>
    )
}
