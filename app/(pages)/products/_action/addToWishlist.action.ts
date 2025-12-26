"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"

export async function AddToWishlistAction(productId: string) {
    const token= await getUserToken()
    const response = await fetch(`${process.env.API_URL}/wishlist`, {
            method: "POST",
            headers: {
                token: token!,
                "content-type": "application/json"
            },
            body: JSON.stringify({ productId })
        })

    const data = await response.json()
    return data
}