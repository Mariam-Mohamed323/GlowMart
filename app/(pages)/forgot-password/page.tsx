"use client"
import { forgotPassword } from '@/app/services/auth.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit() {
        try {
            setLoading(true)
            const res = await forgotPassword(email)
            console.log(res);
            if (res.statusMsg=="success") {
                router.push("/verify-code")
            } else {
                setError(res.message)
            }
        } catch {
            setError("Something went wrong")
        } finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center min-h-[70vh]'>
                <div className='w-full max-w-md text-center space-y-4 border-2 p-5 rounded-2xl'>
                    <h1 className='text-xl font-bold'>Forgot Password</h1>
                    <Input className='my-4' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error && <p className='text-red-600 text-sm'>{ error}</p>}
                    <Button onClick={() => handleSubmit()} disabled={loading} className='w-full my-4'>{ loading&&<Loader className='animate-spin'/>} Send Code</Button>
                </div>
                
        </div>
        </>
    )
}
