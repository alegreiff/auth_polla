import { usePartidos } from './';

export const useGrupo = (grupo) => {
  const partidos = usePartidos();

  if (partidos) {
    const resultado = partidos.filter((match) => match.grupo === grupo);
    return resultado;
  } else {
    return null;
  }
};
