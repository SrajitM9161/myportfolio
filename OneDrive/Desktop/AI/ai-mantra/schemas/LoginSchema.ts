
import { z } from "zod";

export const LogiSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1),
});
