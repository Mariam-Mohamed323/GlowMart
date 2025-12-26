"use server"

import { getUserToken } from "@/app/Helpers/getUserToken";

export async function CashOrderAction(cartId: string, shippingAddress: object) {
    const token = await getUserToken()
    const response = await fetch(`${process.env.API_URL}/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token!,
                "content-type": "application/json"
            }
        })
    const data = await response.json();
    return data
}