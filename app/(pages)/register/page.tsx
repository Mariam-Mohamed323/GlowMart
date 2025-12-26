"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { signUp } from "@/app/services/auth.service"

import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { formSchema } from "@/app/RegisterSchema/RegisterSchema"




type FormFields=z.infer<typeof formSchema>

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null)
  const router = useRouter()

    // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    mode: "onBlur",
    reValidateMode:"onBlur"
  })


  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {

    setLoading(true)
    const res = await signUp(values)
    console.log(res);
    setLoading(false)
    if (res.message=="success") {
      router.push("/login")
    } else {
      setApiError(res.message)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[75vh]">
        <h1 className="mb-3 mt-10 text-2xl font-bold">Register Now and Join Us</h1>
        <Card className='p-5 w-md'>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
                control={form.control}
                
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field} />
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
                <Input placeholder="Enter Your Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-Password</FormLabel>
              <FormControl>
                <Input placeholder="Re-enter your Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="01XXXXXXXXX" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
              <Button disabled={loading} className='w-full cursor-pointer' type="submit">{loading && <Loader className="animate-spin" />}Submit</Button>
              {apiError && <span className="text-red-500 text-center block">{apiError}</span>}
              
              <p className="mt-4 text-center text-gray-600">Already have an account? {" "}
                <Link href="/login" className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors">Login</Link>
              </p>
              
            </form>
            
          </Form>
          
        </Card>

      </div>
      
    </>
  )
}
