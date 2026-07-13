import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Yaroqli email kiriting"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export type LoginForm = z.infer<typeof loginSchema>;