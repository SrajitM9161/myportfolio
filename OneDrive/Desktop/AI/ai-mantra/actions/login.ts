"use server"
import { z } from "zod"
import { LogiSchema } from "../schemas/LoginSchema"
export const login = async (values:z.infer<typeof LogiSchema>) =>{
    const validatedFields=LogiSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:" Invalid Fields"};
    }

    return {success:"Email sent!"}
};