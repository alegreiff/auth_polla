import { Badge, Image, useColorModeValue, VStack } from '@chakra-ui/react';

export const BanderaPais = ({ bandera, nombre }) => {
  const bordeImagen = useColorModeValue('polla.negro', 'polla.blanco');
  const bg = useColorModeValue('red.500', 'red.200');

  return (
    <VStack>
      <Image
        border={`3px solid`}
        borderColor={bordeImagen}
        src={`/banderas/${bandera.toLowerCase()}.png`}
        alt={nombre}
        height={22}
        width={22}
        borderRadius='full'
      />
      <Badge fontSize='1em'>{nombre}</Badge>
    </VStack>
  );
};
