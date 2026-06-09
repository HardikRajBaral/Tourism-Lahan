import { z } from "zod";

export const formSchema = z.object({
  identifier: z.string().min(1, "Email or username is required").refine((value)=>{
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isUsername = /^[a-zA-Z0-9_]+$/.test(value);
    return isEmail || isUsername;
  }),
  password: z.string().min(8, "Password must be at least 6 characters long"),
});


export const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
});

export const registerSchema=z.object({
  username:z.string().min(4,"username is too short").regex(/^[a-zA-Z0-9_]+$/,"username must be alphanumeric"),
  email:z.email('Invalid email address'),
  password:z.string().min(8,"password is too short")
})

export type RegisterType=z.infer<typeof registerSchema>

export type LoginType = z.infer<typeof formSchema>;

export type PostType = z.infer<typeof postSchema>;