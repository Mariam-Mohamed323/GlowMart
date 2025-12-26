import { z } from "zod"
export const formSchema = z.object({
    name: z.string().nonempty("Name is Required").min(4, { message: "Username must be at least 4 characters.", }).max(30, { message: "Username must be at most 30 characters.", }),
    
    email: z.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email format is invalid (example: name@email.com)"),
    
    password: z.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, "Password must include a letter, a number, and a special character"),
    
    rePassword: z.string().nonempty("Re-Password is Required"),
    
    phone: z.string().nonempty("Phone number is required").regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")

}).refine((data) => data.password === data.rePassword, { path: ["rePassword"], message: "Password and Re-Password are not the same" })
