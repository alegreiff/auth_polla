import { Box } from '@chakra-ui/react';
import { useStore } from '../../context/usuarios/UserProvider';

export const InfoPollero = () => {
  const { user } = useStore();
  const pollero = user?.name;

  return <Box>{pollero}</Box>;
};
