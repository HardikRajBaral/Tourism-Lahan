import { z } from "zod";

export const formSchema = z.object({
  identifier: z.string().min(1, "Email or username is required").refine((value)=>{
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isUsername = /^[a-zA-Z0-9_]+$/.test(value);
    return isEmail || isUsername;
  }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type FormSchema = z.infer<typeof formSchema>;