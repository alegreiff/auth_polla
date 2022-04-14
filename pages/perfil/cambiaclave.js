import { useState } from 'react';
import { getCsrfToken, getSession } from 'next-auth/react';
import { Formik } from 'formik';
//CHAKRA
import { Button, Heading, VStack } from '@chakra-ui/react';
//HOOKS
import { useRouter } from 'next/router';
//OTROS

import { TextField } from '../../components/forms/TextField';
import { validaCambiaPassword } from '../../lib';
import { Layout } from '../../components/ui';

export default function CambiaClavePage({ csrfToken }) {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const cambiaPassword = async (values, actions) => {
    const { oldPassword, newPassword } = values;
    const res = await fetch('/api/user/cambia-clave', {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    //console.log(data);
    return;

    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    }
    return router.push('/');
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validationSchema={validaCambiaPassword}
        onSubmit={(values, actions) => {
          cambiaPassword(values, actions);

          //actions.resetForm();
        }}
      >
        {(formik) => (
          <VStack
            padding={4}
            as='form'
            mx='auto'
            w={{ base: '90%', md: 500 }}
            bg='col.negro'
            h='70vh'
            justifyContent='center'
            onSubmit={formik.handleSubmit}
          >
            <Heading> Cambia contraseña</Heading>

            <TextField
              label='Contraseña'
              name='oldPassword'
              type='password'
              placeholder='Escriba su segura contraseña'
            />

            <TextField
              label='Contraseña'
              name='newPassword'
              type='password'
              placeholder='Escriba su segura contraseña'
            />

            <Button type='submit' variant='outline' colorScheme='teal'>
              Cambiar contraseña
            </Button>

            {/* <pre>
              <code>{JSON.stringify(formik, null, 5)}</code>
            </pre> */}
          </VStack>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/' },
    };
  } else {
  }
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
}
