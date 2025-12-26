"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast from "react-hot-toast"
import { signOut } from "next-auth/react"
import { Loader } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { changePasswordSchema } from "@/ChangePasswordSchema/ChangePasswordSchema"
import { ChangePasswordAction } from "./_action/changePassword.action"
import { useState } from "react"

const schema = changePasswordSchema
type FormData = z.infer<typeof schema>

export default function ChangePassword({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  })

  const { register, handleSubmit, formState } = form
    const { errors, isSubmitting } = formState
    const [success, setSuccess] = useState(false)

  async function onSubmit(data: FormData) {
    try {
      await ChangePasswordAction(data)
      toast.success("Password updated successfully 🔐")
        setSuccess(true)
        
      setTimeout(() => {
        signOut({ callbackUrl: "/login" })
      }, 2500)

    } catch (err: any) {
      toast.error(err.message || "Failed to change password")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

              {success ?<div className="text-center py-10 space-y-3">
    <h2 className="text-2xl font-bold">Password Updated 🎉</h2>
    <p className="text-muted-foreground">
      You will be redirected to login
    </p>
    <Loader className="animate-spin mx-auto mt-4" />
  </div>:<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input type="password" placeholder="Current password" {...register("currentPassword")} />
            {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <Input type="password" placeholder="New password" {...register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <Input type="password" placeholder="Confirm new password" {...register("rePassword")} />
            {errors.rePassword && <p className="text-sm text-red-500">{errors.rePassword.message}</p>}
          </div>

          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loader className="animate-spin mx-auto" /> : "Update Password"}
          </Button>
        </form>}
              
      </DialogContent>
    </Dialog>
  )
}