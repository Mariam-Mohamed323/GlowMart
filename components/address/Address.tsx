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
import { AddAddressAction } from '@/app/(pages)/profile/_action/profile.action'
import toast from 'react-hot-toast'
import { AddressI, AddressResponse } from '@/interfaces/address'
import { Loader } from 'lucide-react'


type Props = {
    onAddSuccess: (address: AddressI) => void
}
export default function AddAddress({ onAddSuccess }: Props) {
    
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    let userNameInput=useRef<HTMLInputElement | null>(null)
    let userDetailsInput=useRef<HTMLInputElement | null>(null)
    let userPhoneInput=useRef<HTMLInputElement | null>(null)
    let userCityInput = useRef<HTMLInputElement | null>(null)
    

    async function addUserAddress() {
        setLoading(true);
        const name = userNameInput.current?.value
        const details = userDetailsInput.current?.value
        const phone = userPhoneInput.current?.value
        const city = userCityInput.current?.value

        if (!name || !details || !phone || !city) return
        
        const data:AddressResponse = await AddAddressAction(name, details, phone, city)
        console.log(data);
        if (data.status === "success") {
            const newAddress = data.data[data.data.length - 1]
            onAddSuccess(newAddress)
            setOpen(false)
            toast.success("Address added successfully")
            setLoading(false)
        }

    }



    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <DialogTrigger asChild >
                        <Button className='' variant="outline">Add New Address</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-\[425px\]">
                        <DialogHeader>
                            <DialogTitle>Add Your New Address</DialogTitle>
                            <DialogDescription>
                                Add your address for your deliveries
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label >Name</Label>
                                <Input ref={userNameInput} id="name" />
                            </div>
                            <div className="grid gap-3">
                                <Label >Details</Label>
                                <Input ref={userDetailsInput} id="details" />
                            </div>
                            <div className="grid gap-3">
                                <Label>Phone</Label>
                                <Input ref={userPhoneInput} id="phone" />
                            </div>
                            <div className="grid gap-3">
                                <Label>City</Label>
                                <Input ref={userCityInput} id="city"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={addUserAddress} type="button">{loading && <Loader className='animate-spin' />}Add Address</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}








