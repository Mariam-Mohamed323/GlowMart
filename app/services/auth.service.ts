import { RegisterUserResponse, SuccessRegisterResponse, RegisterFailureResponse, SignUpResult } from "@/interfaces";


// SIGN UP
export async function signUp(userData: RegisterUserResponse): Promise<SignUpResult> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        
        const data: SuccessRegisterResponse | RegisterFailureResponse = await response.json();
        
        return {
            message: data.message,
            user: 'user' in data ? data.user : undefined,
            token: 'token' in data ? data.token : undefined,
            errors: 'errors' in data ? data.errors : undefined
        };

    } catch (error: unknown) {
        return { message: "Network Error", networkError: error instanceof Error ? error.message : "Unknown error" };
    }

}


//FORGOT PASSWORD

export async function forgotPassword(email:string) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        body: JSON.stringify({email}),
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    console.log(data);
    
    return data
}



// VERIFY CODE

export async function verifyResetCode(resetCode:string) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        body: JSON.stringify({ resetCode }),
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data);
    return data
}





// RESET PASSWORD
export async function resetPassword(email:string,newPassword:string) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        body: JSON.stringify({ email, newPassword }),
        headers:{"Content-Type":"application/json"}
    })
    const data = await response.json()
    console.log(data);
    return data
}