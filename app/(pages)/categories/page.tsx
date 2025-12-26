import { CategoryI } from '@/interfaces'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  const response = await fetch(`${process.env.API_URL}/categories`)
  const { data: categories }: { data: CategoryI[] } = await response.json()
  // console.log(categories);
  
  return (
    <>
      <h2 className='text-3xl font-bold my-4'>Categories</h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {categories.map((category) => <div key={category._id}>
          <Link href={"/categories/" + category._id}>
            <Card>
              <CardHeader>
                <Image src={category.image} alt={category.name} width={300} height={300} />
              </CardHeader>
              <CardContent className='text-center'>
                <CardTitle>{category.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        </div>)}
      </div>
    </>
  )
}
