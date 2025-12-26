"use client"

import React, { useContext, useState } from 'react'
import { HeartIcon, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { WishlistContext } from '../wishlistContext/wishlistContext'
import { AddToWishlistAction } from '@/app/(pages)/products/_action/addToWishlist.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToWishlist({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { setWishlistData, getWishlist } = useContext(WishlistContext)
    const session = useSession();
    const router = useRouter()
    
    
    async function addToWishlist() {

        if (session.status === "authenticated") {

            setIsLoading(true)

            const data = await AddToWishlistAction(productId);
            console.log(data);

            data.status == "success" && toast.success("Added to wishlist ❤️")

            // setWishlistData(data)
            getWishlist()
            setIsLoading(false)
        } else {
            router.push("/login")
        }
    
    }
    
    return (
        <>
            <button onClick={addToWishlist}>
                {isLoading ? <Loader className="animate-spin" /> :
                    <HeartIcon className="cursor-pointer hover:text-red-500" />
                }
            </button>
        </>
    )
}
