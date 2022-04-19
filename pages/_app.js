import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '../context/usuarios/UserProvider';

import 'semantic-ui-css/semantic.min.css';
import pollaTema from '../theme';
import '../theme/styles.css';

function MyApp({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={pollaTema}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
