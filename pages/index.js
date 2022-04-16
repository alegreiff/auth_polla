import { getSession, getCsrfToken } from 'next-auth/react';
import { Box } from '@chakra-ui/react';
import { Layout } from '../components/ui';

export default function Home() {
  return (
    <Layout titulo='Inicio'>
      <>
        <Box>hdh iuashdjasdjhasg</Box>
        <h6>https://www.youtube.com/watch?v=UVBUhi5Oaiw</h6>
      </>
    </Layout>
  );
}

/* export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/pollero/signin' },
    };
  } else {
    console.log('Hay una sessión');
  }
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
} */
