import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '../context/usuarios/UserProvider';

function MyApp({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
