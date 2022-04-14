import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import Head from 'next/head';
import Image from 'next/image';
import { desarrollo, elementosMenu } from '../../lib';
import { DarkModeSwitch } from '../../lib';
import { NavLink } from './';
import { signOut, useSession } from 'next-auth/react';

const Links = ['Calendario', 'Información', 'Grupos'];
const Enlaces = elementosMenu;

export const Layout = ({ children, titulo = 'generico' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const srcLogo = useColorModeValue('/logo/nnpp.svg', '/logo/wnnpp.svg');
  const { data: session } = useSession();
  const cerrarSesion = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>{titulo}</title>
      </Head>
      <Container maxW='container.xl'>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box>
                <Image
                  src={srcLogo}
                  width={160}
                  height={60}
                  alt='Nuestra Polla'
                />
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Enlaces.map((link) => (
                  <NavLink
                    key={link.id}
                    nombre={link.nombre}
                    enlace={link.enlace}
                  />
                ))}
              </HStack>
            </HStack>
            <Spacer />
            <DarkModeSwitch />

            {session && (
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
                    <MenuItem onClick={cerrarSesion}> Cerrar sesión </MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            )}
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {/* {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))} */}
              </Stack>
            </Box>
          ) : null}
        </Box>

        <Box p={4}> {children} </Box>
      </Container>
    </>
  );
};
