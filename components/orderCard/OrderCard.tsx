import { OrderI } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

export default function OrderCard({ order }: { order: OrderI }) {
    return (
        <>
            <div className='border rounded-lg p-6 shadow-sm bg-white'>
                <h2>Order #{order._id.slice(-6)}</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700'>
                    <div className='space-y-1'>

                        <p>
                            <span className='font-medium'>Order Date : </span> {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <p>
                            <span className='font-medium'>Payment : </span> {order.paymentMethodType}
                            <span className='ml-2 text-green-600 font-medium'>(Paid)</span>
                        </p>

                        <p>
                            <span className='font-medium'>Delivered : </span>
                            <span className={order.isDelivered ? "text-green-600" : "text-red-500"}>{ order.isDelivered?"Yes":"No"}</span>
                        </p>

                        <p>
                            <span className='font-medium'>Total : </span> {order.totalOrderPrice} EGP
                        </p>
                    </div>

                    <div className='space-y-1'>
                        <p className='font-medium'>Shipping Address</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.details}</p>
                        <p>Phone : {order.shippingAddress.phone}</p>
                    </div>

                </div>

                <div className='flex items-center justify-between mt-6'>
                    <Link href={`/orders/${order._id}`} className='px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition'>View Order Items</Link>
                </div>
                
            </div>
        </>
    )
}
