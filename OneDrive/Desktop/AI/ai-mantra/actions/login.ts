// src/actions/login.ts
"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@/lib/db";
import { LogiSchema } from "../schemas/LoginSchema";
import { getUserByEmail } from "../data/user";

export const login = async (values: z.infer<typeof LogiSchema >) => {
  try {
    const validatedFields = LogiSchema .safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "Invalid email or password!" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid email or password!" };
    }

    // Here, you can generate a session token or perform any other session management logic
    // For example, using NextAuth's `getSession` method, you could set up a session

    return { success: "Login successful!", user };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Failed to login." };
  }
};
