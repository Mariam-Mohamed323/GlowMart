import { Button } from '@/components/ui/button'
import React from 'react'

export default function Loading() {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="relative flex items-center justify-center">

                    <div className="absolute w-24 h-24 rounded-full border-4 border-gray-200"></div>
        
                    <div className="absolute w-24 h-24 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
                    
                    <Button className="w-16 h-16 rounded-full text-white font-bold text-2xl bg-black hover:bg-gray-800 transition">S</Button>

                </div>
            
            </div>
            
        </>
    )
}
