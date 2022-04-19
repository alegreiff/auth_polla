import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import DB from '../../../lib/connectDb';
DB();
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Custom LOGIN',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await Users.findOne({ email });
        if (!user) {
          throw new Error('No estás registrau');
        }
        if (user) {
          return signInUser({ password, user });
        }
      },
    }),
  ],
  pages: {
    signIn: '/pollero/signin',
  },
  jwt: {
    //OBSOLETO
  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
    jwt: true,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      switch (account?.type) {
        case 'oauth':
          token.user = await dbUsers.oAUthToDbUser(
            user?.email || '',
            user?.name || ''
          );
          break;

        case 'credentials':
          token.user = user;
          break;
      }
      //console.log({ token, account, user });
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      //console.log({ session, token, user });
      return session;
    },
  },

  database: process.env.MONGO_URI,
});

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('please enter password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('password incorrefto');
  }
  const { _id, name, email, pollero, image } = user;
  return { _id, name, email, pollero, image };
};
