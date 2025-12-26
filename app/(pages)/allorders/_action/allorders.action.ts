"use server"
import { getUserToken } from "@/app/Helpers/getUserToken";
import { OrderResponse } from "@/interfaces";

export async function GetAllOrdersAction(cartOwnerId:string) {
    const token = await getUserToken()
    const response = await fetch(`${process.env.API_URL}/orders/user/${cartOwnerId}`,{
        headers: {
            token:token!
        }
    })
    const data:OrderResponse = await response.json()
    return Array.isArray(data) ? data : []
}