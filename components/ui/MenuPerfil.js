import {
  Avatar,
  Badge,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/usuarios/UserContext';
import { types } from '../../context/usuarios/userReducer';
import { elementosPerfil } from '../../lib';
import { NavLink } from './NavLink';

export const MenuPerfil = () => {
  const { data: session } = useSession();
  const [store, dispatch] = useContext(UserContext);
  /* console.log({ session }); */

  useEffect(() => {
    if (session) {
      dispatch({
        type: types.userLogin,
        payload: {
          _id: session?.user._id,
          email: session?.user.email,
          name: session?.user.name,
        },
      });
    } else {
      dispatch({ type: types.userLogout });
    }
  }, [session, dispatch]);

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
