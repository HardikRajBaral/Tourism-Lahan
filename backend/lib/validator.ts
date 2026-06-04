import { z } from "zod";


export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(255, "Excerpt must be less than 255 characters"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
});

export const updatePostSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    excerpt: z
      .string()
      .min(1, "Excerpt is required")
      .max(255, "Excerpt must be less than 255 characters")
      .optional(),
    content: z.string().min(1, "Content is required").optional(),
    published: z.boolean().default(false).optional(),
})

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});


export type PostType = z.infer<typeof createPostSchema>;
export type UserType = z.infer<typeof createUserSchema>;
export type LoginType = z.infer<typeof loginUserSchema>;