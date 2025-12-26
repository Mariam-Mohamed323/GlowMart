import { z } from "zod"

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .nonempty("Current password is required"),

  password: z.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, "Password must include a letter, a number, and a special character"),
    
    rePassword: z.string().nonempty("Re-Password is Required"),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
})