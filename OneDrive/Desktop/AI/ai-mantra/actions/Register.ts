"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { getUserByEmail, getUserByusername  } from "../data/user";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { email, password, username, name } = validatedFields.data;

    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return { error: "Email already in use!" };
    }

    const existingUserByUsername = await getUserByusername (username);
    if (existingUserByUsername) {
      return { error: "Username already in use!" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashPassword,
      },
    });

    // Optionally, send verification email here

    return { success: "User created!", user: newUser };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Failed to register user." };
  }
};
