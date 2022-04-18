import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '../context/usuarios/UserProvider';

import 'semantic-ui-css/semantic.min.css';

function MyApp({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
