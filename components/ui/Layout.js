import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import Head from 'next/head';
import Image from 'next/image';
import { elementosMenu } from '../../lib';
import { DarkModeSwitch } from '../../lib';
import { NavLink } from './';
import { MenuPerfil } from './MenuPerfil';
import { InfoPollero } from './InfoPollero';

const Links = ['Calendario', 'Información', 'Grupos'];
const Enlaces = elementosMenu;

export const Layout = ({ children, titulo = '' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const srcLogo = useColorModeValue('/logo/nnpp.svg', '/logo/wnnpp.svg');

  return (
    <>
      <Head>
        <title>{`Nuestra Polla - ${titulo}`}</title>
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

            <MenuPerfil />
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Enlaces.map((link) => (
                  <NavLink
                    key={link.id}
                    nombre={link.nombre}
                    enlace={link.enlace}
                  />
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
        <InfoPollero />

        <Box p={4}> {children} </Box>
      </Container>
    </>
  );
};
