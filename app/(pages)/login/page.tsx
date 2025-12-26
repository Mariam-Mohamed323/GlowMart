"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import {signIn} from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
  email: z.email("Invalid Email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required").min(6, "min length is 6 chars")
  
})

type FormFields=z.infer<typeof formSchema>

export default function Login() {
  let searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  // console.log(searchParams.get("error"));
  
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  async function onSubmit(values: FormFields) {
    console.log(values)
    setIsLoading(true)
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl:"/products",
      redirect: true,
    })
    console.log(response);
    setIsLoading(false)
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-[75vh]'>
        <h1 className='my-3 text-2xl font-bold'>Welcome Back !</h1>
        <Card className='p-5 w-sm'>
          {searchParams.get("error") && <h2 className='text-red-500'>{ searchParams.get("error")}</h2>}
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <div className='flex flex-col'>

                <Button className='w-full cursor-pointer' type="submit">{isLoading && <Loader className='animate-spin' />} Submit</Button>

                

              </div>

          </form>
        </Form>
        </Card>
        <Link href={"/forgot-password"}>
          
          <button className="rounded-md mt-3 cursor-pointer bg-gray-200  py-1 px-2 hover:text-white hover:bg-gray-500 transition-all " type='submit'>Forget Password</button>
          
        </Link>
        <p className='mt-2'>If you don't have account, Please <Link className='text-blue-600 font-bold underline' href={"/register"}>SignUp</Link> Now</p>
        
        
      </div>
    </>
  )
}
