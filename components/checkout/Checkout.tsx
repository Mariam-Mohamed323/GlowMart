"use client"
import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { CartResponse } from '@/interfaces'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CheckoutSessionAction } from './_action/checkoutSession.action'
import { CashOrderAction } from './_action/cashorder.action'


export default function Checkout({ cartId, setCartData }: {
    cartId: string
    setCartData: (value: any) => void
}) {


    const detailsInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)
    const [open, setOpen] = useState(false)
    const router = useRouter()


    async function checkOutSession() {
        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }
        const data = await CheckoutSessionAction(shippingAddress, cartId)
        console.log(data);
        if (data.status == "success") {
            window.location.href = data.session.url;
        }
    }


    async function createCashOrder() {
        const shippingAddress = {
            details: detailsInput.current?.value,
            phone: phoneInput.current?.value,
            city: cityInput.current?.value
        }

        const data = await CashOrderAction(cartId, shippingAddress)
        console.log(data);
        if (data.status === "success") {
            toast.success("Order placed successfully 🎉")
            setCartData(null)
            setOpen(false);
            router.push("/allorders")
        } else {
            toast.error("Something went wrong 😢")
        }
        
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <form>
                    <DialogTrigger asChild>
                        <Button onClick={()=>setOpen(true)} className='w-full text-lg mt-4' variant="outline">Proceed to Checkout</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-\[425px\]">
                        <DialogHeader>
                            <DialogTitle>Add Shipping Address</DialogTitle>
                            <DialogDescription>Make sure you entered the right address</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label>City</Label>
                                <Input ref={cityInput} id="city" />
                            </div>
                            <div className="grid gap-3">
                                <Label>Details</Label>
                                <Input ref={detailsInput} id="details" />
                            </div>
                            <div className="grid gap-3">
                                <Label>Phone</Label>
                                <Input ref={phoneInput} id="phone" />
                            </div>
                            
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => createCashOrder()} type="button">Cash</Button>
                            <Button onClick={() => checkOutSession()} type="button">Visa</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}
