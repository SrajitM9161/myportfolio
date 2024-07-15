import NextAuth from "next-auth"
import authConfig from "./auth.config"

const {auth}= NextAuth(authConfig)

export default auth((req:any) =>{
  const isLoggedIn= !! req.auth
  console.log("ROUTE",req.nextUrl.pathname)
  console.log("Is Logged",isLoggedIn)
})

  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };
  
