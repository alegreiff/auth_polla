import { useDispatch, useStore } from '../../context/usuarios/UserProvider';
import { cloneDeep } from 'lodash';
import { types } from '../../context/usuarios/userReducer';
import { cargaEquipos } from '../acciones/cargaEquipos';
import { useEffect, useState } from 'react';

export const useEquiposGrupo = (grupo) => {
  //const dispatch = useDispatch();
  const { equipos } = useStore();
  const [timao, setTimao] = useState(null);

  useEffect(() => {
    if (equipos) {
      //console.log('chiega o timao', equipos);
      setTimao(equipos);
      //datos(equipos, grupo);
    } else {
      console.info('SW');
    }
  }, [equipos, timao, grupo]);

  return datos(timao, grupo);

  /* if (!timao) {
    storeEquipos(dispatch);
    return datos(timao, grupo);
  } else {
    return datos(timao, grupo);
  } */
};

const datos = (equipos, grupo) => {
  //console.log(equipos[0]);
  const misEquipos = cloneDeep(equipos);
  if (misEquipos) {
    const resultado = misEquipos.filter((eq) => eq.grupo === grupo);
    //console.log(resultado.length);
    return resultado;
  } else {
    console.log(equipos);
    console.log('SAeroiusly');
  }
};

async function storeEquipos(dispatch) {
  const loadEquipos = await cargaEquipos();
  dispatch({
    type: types.cargaEquipos,
    payload: loadEquipos,
  });
}
