import { useState } from 'react';
import {
  getCsrfToken,
  getProviders,
  signIn,
  getSession,
} from 'next-auth/react';
import { Formik, Field } from 'formik';
//CHAKRA
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
//HOOKS
import { useRouter } from 'next/router';
//OTROS

import { TextField } from '../../components';
import { validaNuevoUsuario } from '../../lib';

export default function SignIn({ csrfToken }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const [message, setMessage] = useState(null);

  const signin = () => {
    router.push('/pollero/signin');
  };

  const registraUsuario = async (valores, acciones) => {
    const { correo: email, nombre: name, password } = valores;
    acciones.resetForm();

    setMessage(null);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    let data = await res.json();

    if (data.message) {
      setMessage(data.message);
    }
    if (data.message === 'Registro etsitoso') {
      //accesoUser(valores.email, valores.password);
      await signIn('credentials', { email, password });

      //return Router.push("/");
    }
  };

  const initialValues = {
    nombre: '',
    correo: '@test.es',
    password: '',
    terminos: false,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validaNuevoUsuario}
        onSubmit={(values, actions) => {
          registraUsuario(values, actions);

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
            <Heading> Registro básico de usuario</Heading>
            <h4>{message}</h4>

            <TextField
              label='Nombres y apellidos'
              name='nombre'
              type='text'
              placeholder='Nombres completos'
            />

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

            <FormControl
              isInvalid={formik.errors.terminos && formik.touched.terminos}
            >
              <InputRightElement>
                <FormLabel>Términos y condiciones</FormLabel>
              </InputRightElement>

              <Field
                as={Switch}
                {...formik.getFieldProps('terminos')}
                isChecked={formik.values.terminos}
                size='lg'
              />
              <Button
                isFullWidth={true}
                mt={4}
                ml={2}
                size='xs'
                onClick={onOpen}
              >
                Ver términos y condiciones
              </Button>
              <FormErrorMessage>{formik.errors.terminos}</FormErrorMessage>
            </FormControl>

            <Button type='submit' variant='outline' colorScheme='teal'>
              Crear cuenta
            </Button>
            <Button
              onClick={signin}
              type='button'
              variant='outline'
              colorScheme='teal'
            >
              Ya tengo usuario
            </Button>
            {/* <pre>
              <code>{JSON.stringify(formik, null, 5)}</code>
            </pre> */}
          </VStack>
        )}
      </Formik>
      <Modal loseOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Entre amigos bla bla bla</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
    //console.log('RREEQQ', req);
  }
  const csrfToken = await getCsrfToken(context);

  //console.log('TTKK', csrfToken);

  return {
    props: { csrfToken },
  };
}
