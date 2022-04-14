import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  useSession,
  signIn,
  signOut,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import { Box } from '@chakra-ui/react';
import { Layout } from '../components/ui';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout>
        <>
          <Box>
            Signed in as {session.user.email}
            <Image
              src={session?.user.image}
              alt='USER'
              width={40}
              height={40}
            />
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </Box>
        </>
      </Layout>
    );
  }
  return (
    <>
      <Box bg='orange' color='red'>
        <h2>Hola Mundo</h2>
        <button onClick={() => signIn()}>Ingresar</button>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/signin' },
    };
  } else {
    console.log('Hay una sessión');
  }
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
}
