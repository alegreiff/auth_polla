import useSWR from 'swr';
import { fetcher } from '../';
import _uniq from 'lodash/uniq';
import _map from 'lodash/map';
import { useDispatch, useStore } from '../../context/usuarios/UserProvider';
import { types } from '../../context/usuarios/userReducer';
import { cargaPartidos } from '../acciones/cargaPartidos';

export const useCargaPronosPollero = (userId) => {
  const { partidos } = useStore();
  const dispatch = useDispatch();

  const { data, error } = useSWR(
    userId ? `/api/polla/pronos/${userId}` : null,
    fetcher
  );

  return {
    arePronos: ordenaPronos(data?.pronos, partidos, dispatch),
    //arePronos: data,
    //arePronos: op(data?.pronos),
    isLoading: !error && !data,
    isError: error,
  };
};

const ordenaPronos = (data = [], partidos, dispatch) => {
  if (!partidos) {
    console.log('A dispatchar a su madre');
    storePartidos(dispatch);
  } else {
    const p = partidos.filter((p) => p.fase === 1);
    const grupos = _uniq(_map(p, 'grupo'));

    grupos.forEach((grupo) => {});

    const misPronos = [];
    p.forEach((match) => {
      const pron = data.find((prono) => prono.match === match.match);
      if (pron)
        misPronos.push([
          match.grupo,
          pron.match,
          [pron.mloc, pron.mvis],
          pron.comodin,
        ]);
      /* console.log(match.match, [
        pron.match,
        pron.mloc,
        pron.mvis,
        pron.comodin,
      ]); */
    });

    return [grupos, misPronos];
  }
};

//const { data, error } = useSWR(`/api/temas`, fetcher);

async function storePartidos(dispatch) {
  const loadPartidos = await cargaPartidos();
  dispatch({
    type: types.cargaPartidos,
    payload: loadPartidos,
  });
}
