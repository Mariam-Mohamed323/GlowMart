import { BrandI } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';

export default async function Brands() {
  const response = await fetch(`${process.env.API_URL}/brands`);
  const { data: brands }: { data: BrandI[] } = await response.json()
  
  // console.log(brands);

  
  return (
    <>
      <h2 className='text-3xl font-bold my-4'>Brands</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
        {brands.map((brand) => <div key={brand._id} className='hover:shadow-xl transition-all duration-300'>
          <Link href={"/brands/" + brand._id}>
          <Card className=''>
            <CardHeader>
              <Image src={brand.image} height={300} width={300} alt={brand.name} />
              <CardTitle className='text-center pb-3'>{brand.name}</CardTitle>
            </CardHeader>
          </Card>
          </Link>
        </div>)}
      </div>
    </>
  )
}
