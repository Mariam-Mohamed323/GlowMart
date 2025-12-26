"use client"
import { verifyResetCode } from '@/app/services/auth.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function VerifyCode() {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    async function handleVerify() {
        setLoading(true);
        const res = await verifyResetCode(code)
        console.log(res);
        
        if (res.status == "Success") {
            sessionStorage.setItem("resetVerified", "true")
            router.push("/reset-password")
        } else {
            setError(res.message || "Invalid Code")
        }
        setLoading(false)
    }
    return (
        <>
            <div className='flex justify-center items-center min-h-[70vh]'>
                <div className='w-full max-w-md border-2 rounded-2xl space-y-4 p-5 text-center'>
                    <h1 className='font-bold text-2xl'>Verify Code</h1>
                    <Input className='my-4' placeholder='Enter Reset Code' value={code} onChange={(e) => setCode(e.target.value)} />
                    {error&&<p className='text-red-600 text-sm'>{ error}</p>}
                    <Button onClick={() => handleVerify()} className='w-full my-4'>{loading && <Loader className='animate-spin' />}Verify</Button>
                    
                </div>
        </div>
        </>
    )
}
