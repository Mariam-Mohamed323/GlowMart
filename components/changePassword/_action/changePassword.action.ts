"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"
import { ChangePasswordResponse } from "@/interfaces";

export async function ChangePasswordAction(data: {
    currentPassword: string,
    password: string,
    rePassword: string
}) {
    const token = await getUserToken();
    if (!token) {
        throw new Error("Not authenticated")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/changeMyPassword`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            token: token!,
            "Content-Type": "application/json"
        }
    })
    const result: ChangePasswordResponse = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Failed")
    }
    return result;
}
