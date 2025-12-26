"use server"
import { getUserToken } from "@/app/Helpers/getUserToken";
import { AddressResponse } from "@/interfaces/address";

export async function GetUserAddressAction() {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_URL}/addresses`, {
        headers: {
            token:token!
        }
    })
    const data:AddressResponse = await response.json()
    
    return data
}



export async function AddAddressAction(name: string, details: string, phone: string, city: string) {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_URL}/addresses`, {
            method: "POST",
            body: JSON.stringify({ name, details, phone, city }),
            headers: {
                token: token!,
                "Content-Type": "application/json"
            }
        })
    const data:AddressResponse = await response.json();
    
    return data
}





export async function RemoveAddressAction(addressId: string) {
    const token = await getUserToken()
    
    const response = await fetch(`${process.env.API_URL}/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
            token: token!
        }
    })
    const data:AddressResponse = await response.json();
    return data
    
}