import { useState } from 'react';
import { getCsrfToken, signIn, getSession } from 'next-auth/react';
import { Formik } from 'formik';
//CHAKRA
import { Button, Heading, VStack } from '@chakra-ui/react';
//HOOKS
import { useRouter } from 'next/router';
//OTROS

import { TextField } from '../components/forms/TextField';
import { validaSignIn } from '../lib';

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const registro = () => {
    router.push('/register');
  };

  const signInUser = async (values, actions) => {
    const { correo: email, password } = values;
    let options = { redirect: false, email, password };
    const res = await signIn('credentials', options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    }
    return router.push('/');
  };

  const initialValues = {
    correo: '',
    password: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validaSignIn}
        onSubmit={(values, actions) => {
          signInUser(values, actions);

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
            <Heading> Acceso</Heading>

            <TextField
              label='Correo electrónico'
              name='correo'
              type='email'
              placeholder='Su correo electrónico'
            />

            <TextField
              label='Contraseña'
              name='password'
              type='password'
              placeholder='Escriba su segura contraseña'
            />

            <Button type='submit' variant='outline' colorScheme='teal'>
              Ingresar
            </Button>
            <Button
              onClick={registro}
              type='button'
              variant='outline'
              colorScheme='teal'
            >
              No tengo usuario, deseo registrarme
            </Button>
            {/* <pre>
              <code>{JSON.stringify(formik, null, 5)}</code>
            </pre> */}
          </VStack>
        )}
      </Formik>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
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
