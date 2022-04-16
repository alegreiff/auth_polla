import { useToast } from '@chakra-ui/react';

export const ToastMensaje = ({
  title = 'Mensaje pollero',
  description = '',
  status = 'info',
}) => {
  const toast = useToast();
  return toast({
    title: { title },
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
  });
};
