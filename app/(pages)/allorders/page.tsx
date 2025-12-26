"use client"
import { CartContext } from '@/components/context/CartContext'
import React, { useContext, useEffect, useState } from 'react'
import { GetAllOrdersAction } from './_action/allorders.action'
import { OrderI } from '@/interfaces'
import { useSession } from 'next-auth/react'
import OrderCard from '@/components/orderCard/OrderCard'

export default function AllOrders() {
  const { cartData } = useContext(CartContext)
  const [orders, setOrders] = useState<OrderI[]>([])
  const [isLoading, setIsLoading] = useState(false)
  // const cartOwnerId = cartData?.data.cartOwner

 const [cartOwnerId, setCartOwnerId] = useState<string | null>(null);

  
  
  async function getUserOrders(ownerId: string) {
    setIsLoading(true)
    const data = await GetAllOrdersAction(ownerId);
    // console.log(data);
    setOrders(data)

    console.log("cartOwnerId:", cartOwnerId)
    // console.log("orders:", orders)
    setIsLoading(false)
  }


  useEffect(() => {
    if (cartOwnerId) {
      
      getUserOrders(cartOwnerId)
    }
  },[cartOwnerId])
useEffect(() => {
  if (cartData?.data.cartOwner) {
    setCartOwnerId(cartData.data.cartOwner);
  } else {
    const stored = localStorage.getItem("cartOwner");
    if (stored) setCartOwnerId(stored);
  }
}, [cartData]);

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">All Orders</h1>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p className="text-center text-gray-500 flex justify-center items-center">No orders yet</p>
        ) : (
            Array.isArray(orders) && orders.map(order => (
              <OrderCard key={order._id} order={order}/>
            ))
        )}
    </div>
    </>
  )
}

