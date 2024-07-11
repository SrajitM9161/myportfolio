"use server"
import { z } from "zod"
import { RegisterSchema  } from "../schemas/RegisterSchema"
export const Register = async (values:z.infer<typeof RegisterSchema >) =>{
    const validatedFields=RegisterSchema .safeParse(values);

    if(!validatedFields.success){
        return {error:" Invalid Fields"};
    }

    return {success:"Email sent!"}
};