import { z } from "zod";

export const formSchema = z.object({
  email: z.email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type FormData = z.infer<typeof formSchema>;