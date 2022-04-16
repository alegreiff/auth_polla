import { Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Layout, SelectField, TextField } from '../../components';
import { ToastMensaje } from '../../components/ui/ToastMensaje';
import { UserContext } from '../../context/usuarios/UserContext';
import { useStore } from '../../context/usuarios/UserProvider';
import { types } from '../../context/usuarios/userReducer';
import { equiposColombia, validaPerfil } from '../../lib';

export default function PerfilPage() {
  const router = useRouter();
  const [store, dispatch] = useContext(UserContext);
  const user = useStore();
  const [userId, setUserId] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (user.user) {
      setUserId(user.user._id);
    }
  }, [user]);

  const guardaPerfil = async (values, actions) => {
    const { hincha, usuario } = values;
    actions.resetForm();

    const res = await fetch('/api/user/perfilpollero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hincha, usuario }),
    });
    let data = await res.json();

    if (data.message) {
      toast({
        title: 'Error creando Perfil',
        description: `${data.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    if (data.message === 'Vamos bien') {
      //accesoUser(valores.email, valores.password);
      console.log('RESULTADO', data);
      dispatch({
        type: types.cargaPerfil,
        payload: data.pollero,
      });
      toast({
        title: 'Perfil creado.',
        description: `Ahora eres hincha de: ${hincha}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      return router.push('/perfil');
    }
  };
  const initialValues = {
    hincha: '',
    usuario: userId,
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validationSchema={validaPerfil}
        onSubmit={(values, actions) => {
          guardaPerfil(values, actions);
        }}
        enableReinitialize
      >
        {(formik) => (
          <VStack
            as='form'
            autoComplete='off'
            mx='auto'
            w={{ base: '90%', md: 900 }}
            //h="100vh"
            justifyContent='flex-start'
            onSubmit={formik.handleSubmit}
          >
            <Heading> {userId} </Heading>
            <SelectField
              name='hincha'
              id='hincha'
              label='Hincha de ...'
              datos={equiposColombia}
              placeholder='Seleccione'
            />
            <TextField
              label='USUARIO'
              name='usuario'
              type='text'
              placeholder='USUARIO'
            />

            <Button type='submit' variant='outline' colorScheme='teal'>
              Crear cuenta
            </Button>
          </VStack>
        )}
      </Formik>
    </Layout>
  );
}
