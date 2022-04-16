import {
  Badge,
  Button,
  Image,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

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
        height={45}
        width={45}
        borderRadius='full'
      />
      <Badge>{nombre}</Badge>
    </VStack>
  );
};
/* 

style={{
                        width: cell.column.width,
                        padding: "10px",
                        borderStyle: "solid",
                        borderWidth: "0px",
                        borderColor:
                          power > 3320
                            ? "#a9dfbf"
                            : power > 3178
                            ? "#FCF3CF"
                            : power > 3036
                            ? "#c39bd3"
                            : "#d98880",
                      }}

*/
