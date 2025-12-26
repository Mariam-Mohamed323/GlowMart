"use client"
import { resetPassword } from '@/app/services/auth.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ResetPassword() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        const verified = sessionStorage.getItem("resetVerified")
        if (!verified) {
            router.push("/forgot-password")
        }
    }, [])
    
    async function handleReset() {
        setLoading(true)
        const res = await resetPassword(email,password)
        console.log(res);
        if(res.token){
            sessionStorage.removeItem("resetVerified")
            router.push("/login")
        } else {
            setError(res.message)
        }
        setLoading(false);
    }
    return (
        <>
            <div className='flex justify-center items-center min-h-[70vh]'>
                <div className='w-full max-w-md border-2 rounded-2xl space-y-4 p-5 text-center'>
                    <h1 className='font-bold text-xl'>Reset Password</h1>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='New Password' />
                    {error&&<p className='text-red-600 text-sm'>{error}</p>}
                    <Button onClick={() => handleReset()} className='w-full my-4'>{loading && <Loader className="animate-spin" />} Reset Password</Button>
                </div>
        </div>
        </>
    )
}
