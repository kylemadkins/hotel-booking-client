import NextAuth, { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER as string,
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile && "cognito:groups" in profile) {
        token.roles = profile["cognito:groups"];
      }
      return token;
    },
    session({ session, token }) {
      if (token.roles) {
        session.user.roles = token.roles;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
