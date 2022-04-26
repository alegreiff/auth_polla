import useSWR from 'swr';
import { fetcher } from '../';

export const useCargaPerfil = (userId) => {
  const { data, error } = useSWR(`/api/polla/pronos/${userId}`, fetcher);

  return {
    arePronos: data?.pronos,
    isLoading: !error && !data,
    isError: error,
  };
};
//const { data, error } = useSWR(`/api/temas`, fetcher);
