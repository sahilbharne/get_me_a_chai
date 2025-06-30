import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
          scope: "user:email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // Required for Vercel
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        
        // Check if user exists in database
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Create new user if doesn't exist
          const newUser = new User({
            email: user.email,
            username: profile.login || user.email.split("@")[0],
            githubId: profile.id.toString(),
          });
          await newUser.save();
        }
        
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async session({ session, token }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        
        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.username = dbUser.username;
          session.user.githubId = dbUser.githubId;
        }
        
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV !== "production",
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
