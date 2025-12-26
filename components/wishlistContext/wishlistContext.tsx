"use client"
import { WishlistResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<{
    wishlistData: WishlistResponse | null,
    setWishlistData: (value: WishlistResponse | null) => void,
    loading: boolean,
    setLoading: (value: boolean) => void,
    getWishlist: () => void
    
}>({
    wishlistData: null,
    setWishlistData: () => { },
    loading: false,
    setLoading: () => { },
    getWishlist: () => { }
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    async function getWishlist() {

        setLoading(true);

        const response = await fetch("http://localhost:3000/api/get-wishlist")
        const data: WishlistResponse = await response.json();
        // console.log(data);
        
        setWishlistData(data);

        setLoading(false)
    }
    
    useEffect(() => {
        getWishlist()
    }, [])
    

    return <WishlistContext.Provider value={{ wishlistData, setWishlistData, loading, setLoading, getWishlist }}>
        {children}
    </WishlistContext.Provider>
}
