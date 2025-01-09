import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/login/',
  },
  callbacks: {
    async jwt({ token, user, profile,account }) {
      if (account && user) {

        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        }

      }



      return token;
    },


    async session({ session, token }) {
     // console.log('test case here',session.user,token);
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.accessTokenExpires = token.accessTokenExpires

      return session

    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})
