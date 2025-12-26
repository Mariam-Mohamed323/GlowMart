"use server"

import { getUserToken } from "@/app/Helpers/getUserToken";
import { WishlistResponse } from "@/interfaces";

export async function RemoveWishlistAction(productId: string) {
    const token = await getUserToken()
    const response = await fetch(`${process.env.API_URL}/wishlist/` + productId, {
            method: "DELETE",
            headers:{
                token: token!
            }
        })
        const data: WishlistResponse = await response.json();

        return data
}