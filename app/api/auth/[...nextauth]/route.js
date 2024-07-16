import NextAuth from "next-auth/next";
import { GoogleProvider } from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import GithubProvider from "next-auth/providers/github";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        console.log("db user:", userExists);
        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          const user = await User.create({
            email: profile.email,
            username: profile.login.replace(" ", "").toLowerCase(),
            image: profile.avatar_url,
          });
          console.log(user);
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
