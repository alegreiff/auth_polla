import { Badge, HStack, VStack } from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

export const EstrellasPartido = ({ times, value }) => {
  return (
    <VStack>
      <Badge colorScheme='green'>{value}</Badge>

      <HStack>
        {Array(times)
          .fill(1)
          .map((el, i) => (
            <AiFillStar key={i} style={{ padding: 0, margin: 0 }} />
          ))}
      </HStack>
    </VStack>
  );
};
