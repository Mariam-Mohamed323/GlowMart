"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { GetUserAddressAction, RemoveAddressAction } from "./_action/profile.action"
import AddAddress from "@/components/address/Address"
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { AddressI } from '@/interfaces/address'


export default function Profile() {
  const session = useSession()
  const [defaultAddress, setDefaultAddress] = useState<AddressI | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [addresses, setAddresses] = useState<AddressI[]>([])
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())
  
  
  useEffect(() => {
  const saved = localStorage.getItem("defaultAddress")
  if (saved) {
    setDefaultAddress(JSON.parse(saved))
  }
  }, [])
  

  useEffect(() => {
    async function getUserAddresses() {
      setLoading(true)
      try {
        const res = await GetUserAddressAction()
        if (res?.data) {
          // setDefaultAddress(res.data[0] || null)
          setDefaultAddress(prev => prev ?? res.data[0] ?? null)
          
          setAddresses(res.data)
          
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getUserAddresses()
  }, [])



  async function removeAddress(addressId: string) {
    try {
      setRemovingIds(prev => new Set(prev).add(addressId))
      const data = await RemoveAddressAction(addressId)
      if (data.status == "success") {
        console.log(data);
        toast.success("Address removed successfully")
        // toast.success(data.message)
        setAddresses(data.data)
        // if (defaultAddress?._id === addressId) {
        //   setDefaultAddress(data.data[0] || null)
        // }
      }
      
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove address")
    } finally {
      setRemovingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(addressId)
        return newSet
    })
  }
  }

  return (
    <>
      <h1 className='text-3xl font-bold tracking-tight mt-6'>Profile</h1>
      <div className='grid gap-6  lg:items-start mt-6'>
        <div className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
          <div className='flex-1'>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="">
                <h3 className=' text-base md:text-lg line-clamp-2 text-muted-foreground
                '>
                  Your Name: {session.status == "authenticated" && <span className='text-black '>{session.data.user.name}</span>}
                </h3>
                <p className=' text-muted-foreground mt-1'>
                  Email: {session.status == "authenticated" && <span className='text-black text-sm'>{ session.data.user.email}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
          <div className='flex-1 flex flex-col gap-3'>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className='my-3 text-base md:text-md text-black font-bold'>
                Addresses
              </h3>
              <div className='flex justify-end'>

                <AddAddress onAddSuccess={(newAddress) => {
                  setAddresses(prev=>[...prev,newAddress])
                  if (!defaultAddress) {
                    setDefaultAddress(newAddress)
                    localStorage.setItem("defaultAddress", JSON.stringify(newAddress))

                  }
                }} />

              </div>
              
            </div>
            
            <p className="font-medium text-muted-foreground">Your Default Address : {loading ? <Loader className="animate-spin" /> : defaultAddress ? (
              <span className='text-black'>
                {defaultAddress.details}, {defaultAddress.city}
              </span>
            ) : (
                <span className='text-black'>No default address set</span>
            )}</p>
            
            
            {addresses.length > 0 ? (
              <div className="mt-2 text-sm space-y-3">
                {addresses.map((address) => (
                  <div key={address._id} className="border rounded-lg p-3 bg-gray-100">
                    
                    <p className='my-1'><b>Name:</b> {address.name}</p>
                    <p className='my-1'><b>Details:</b> {address.details}</p>
                    <p className='my-1'><b>Phone:</b> {address.phone}</p>
                    <p className='my-1'><b>City:</b> {address.city}</p>

                    <button onClick={()=>removeAddress(address._id)} aria-label='remove' className='text-sm mt-3 cursor-pointer flex text-destructive hover:underline items-center'>
                      {removingIds.has(address._id) && <Loader className="animate-spin w-4 h-4" />}
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
                <p className="text-muted-foreground text-sm">No address added yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}