import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
      const user = await db.user.findUnique({ where: { email } });
      return user;
    } catch {
      return null;
    }
  };

export const getUserByid = async (id:string) =>{
    try {
        
        const user =await db.user.findUnique({where:{id}});

        return user;
    } catch  {
        null
    }
}

export const getUserByusername = async (username:string) =>{
    try {
        
        const user =await db.user.findUnique({where:{username}});

        return user;
    } catch  {
        null
    }
}