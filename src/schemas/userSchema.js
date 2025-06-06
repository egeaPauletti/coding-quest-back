import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()("Invalid name"),
  password: z.string().min(6, "Password must have 6 characters")
})
