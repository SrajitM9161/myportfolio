import GitHubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};

export default authOptions;
