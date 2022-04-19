import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useDispatch, useStore } from '../../context/usuarios/UserProvider';
import { types } from '../../context/usuarios/userReducer';
import { cargaPerfil, elementosPerfil } from '../../lib';
import { cargaEquipos } from '../../lib/acciones/cargaEquipos';
import { cargaPartidos } from '../../lib/acciones/cargaPartidos';
import { NavLink } from './NavLink';

export const MenuPerfil = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const { data: session } = useSession();
  //const [store, dispatch] = useContext(UserContext);
  const { user, perfil, partidos, equipos } = store;

  //

  useEffect(() => {
    if (session) {
      if (!user) {
        dispatch({
          type: types.userLogin,
          payload: {
            _id: session?.user._id,
            email: session?.user.email,
            name: session?.user.name,
          },
        });
      }
      if (!perfil) {
        storePerfil();
      }
      if (!partidos) {
        storePartidos();
      }
      if (!equipos) {
        console.log(' -- imagine no teams -- ');
        storeEquipos();
      }
    } else {
      dispatch({ type: types.userLogout });
    }
    async function storePerfil() {
      const loadPerfil = await cargaPerfil(session?.user._id);
      dispatch({
        type: types.cargaPerfil,
        payload: loadPerfil.perfil,
      });
    }
    async function storePartidos() {
      console.log('CARGANDO PARTIDOS');
      const loadPartidos = await cargaPartidos();
      dispatch({
        type: types.cargaPartidos,
        payload: loadPartidos,
      });
    }

    async function storeEquipos() {
      const loadEquipos = await cargaEquipos();
      dispatch({
        type: types.cargaEquipos,
        payload: loadEquipos,
      });
    }
  }, [session, dispatch, perfil, user, partidos, equipos]);

  const cerrarSesion = () => {
    signOut();
  };
  if (session) {
    return (
      <Flex alignItems={'center'} ml={5}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar size={'sm'} src={session?.user.image} />
          </MenuButton>
          <MenuList>
            <Badge w='100%' padding={2}>
              {session.user.name}
            </Badge>
            <MenuDivider />
            {elementosPerfil.map((elem) => (
              <MenuItem key={elem.id}>
                <NavLink nombre={elem.nombre} enlace={elem.enlace}></NavLink>
              </MenuItem>
            ))}
            {/* <MenuItem>Link 3</MenuItem> */}
            <MenuDivider />
            <MenuItem onClick={cerrarSesion}> Cerrar sesión </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }
};
