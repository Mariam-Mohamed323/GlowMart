"use client"
import Loading from '@/app/loading'
import Checkout from '@/components/checkout/Checkout'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import { Loader, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ClearCartAction, RemoveCartAction, UpdateCartAction } from './_action/cart.action'

export default function Cart() {
  let { cartData, isLoading, getCart, setCartData } = useContext(CartContext)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [isClearing, setIsClearing] = useState<boolean>(false)
  
  // if (typeof cartData?.data.products[0]?.product == "string" || cartData == null)
  // {
  //   getCart();
  // } 
  useEffect(() => {
  if (
    cartData == null ||
    typeof cartData?.data.products[0]?.product === "string"
  ) {
    getCart();
  }
}, [cartData]);



  async function removeCartItem(productId: string) {
    setRemovingId(productId);
    const data = await RemoveCartAction(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product Deleted Successfully");
      setCartData(data)
    }
    setRemovingId(null);
    
  }


  async function updatedCartItem(productId: string, count: number) {
    setUpdatingId(productId);
    const data = await UpdateCartAction(productId,count)
    // console.log(data);
    if (data.status == "success") {
      toast.success("Product Quantity Updated Successfully");
      setCartData(data)
    }
    setUpdatingId(null);
    
  }


  async function clearCart() {
    setIsClearing(true)
    const data = await ClearCartAction()
    // console.log(data);
    if (data.message == "success") {
      setCartData(null)
    }
    setIsClearing(false)
    
  }
  
  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == "string" ? <Loading /> : cartData?.numOfCartItems! > 0 ? <div className="container mx-auto py-6 px-4">
        <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
        <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} items in your cart</p>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6'>
          {/* items details */}
          <div className='lg:col-span-2 space-y-4'>
            {cartData?.data.products.map((item)=><div key={item._id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
              <Image src={item.product.imageCover} height={300} width={300} alt={item.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
              <div className='flex-1'>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="">
                    <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                      {item.product.title}
                    </h3>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {item.product.brand.name} - {item.product.category.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      EGP {item.price}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updatedCartItem(item.product.id, item.count - 1)} aria-label='decrease' disabled={item.count == 1} className='size-8 rounded-lg border hover:bg-accent'>
                      -
                    </button>
                    <span className='w-6 text-center font-medium'>
                      {updatingId == item.product.id ? <Loader className='animate-spin' /> :  item.count }
                    </span>
                    <button onClick={() => updatedCartItem(item.product.id, item.count + 1)} aria-label='increase' className='size-8 rounded-lg border hover:bg-accent'>
                      +
                    </button>
                  </div>

                  <button onClick={() => removeCartItem(item.product.id)} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center'>
                    {removingId==item.product.id&&<Loader className='animate-spin'/>}
                    Remove
                  </button>
                </div>
              </div>
            </div>)}
  

          </div>
          {/* order summary */}
          <div className="lg:col-span-1 sticky top-18">
            <div className="rounded-xl border p-5 shadow-sm">
              <h2 className='text-lg font-semibold'>Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>
                    Subtotal : {cartData?.numOfCartItems} items
                  </span>
                  <span className='font-semibold'>{cartData?.data.totalCartPrice} EGP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>Shipping</span>
                  <span className='text-emerald-600 font-medium'>Free</span>
                </div>
              </div>
              <div className="my-4 border-t">
                <div className="flex items-center justify-between">
                  <span className='text-base font-semibold'>Total</span>
                  <span className='text-base font-bold'>{cartData?.data.totalCartPrice} EGP</span>
                </div>
                
                <Checkout cartId={cartData?.cartId!} setCartData={setCartData} />
                

                <Link href={"/products"}>
                  <Button className='w-full text-lg mt-2'>Continue Shopping</Button>
                </Link>

              </div>
              <Button onClick={clearCart} variant={"outline"} className='mt-2 ms-auto text-destructive hover:text-destructive flex'> {isClearing ? <Loader className='animate-spin' /> : <Trash2 />}Clear Cart</Button>
            </div>
          </div>
        </div>
      </div> :
        <div className="flex justify-center items-center min-h-[75vh] flex-col">
          <h2 className='text-2xl my-4'>Your Cart Is Empty....</h2>
          <Link href={"/products"}>
            <Button>Add products to your cart</Button>
          </Link>
        </div>
      }
    </>
  )
}
