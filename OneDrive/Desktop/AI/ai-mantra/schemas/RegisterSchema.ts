
import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string(),
  name : z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
