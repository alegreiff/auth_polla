import { useDispatch, useStore } from '../../context/usuarios/UserProvider';
import { sortBy } from 'lodash';
import { cargaPartidos } from '../acciones/cargaPartidos';
import { cargaEquipos } from '../acciones/cargaEquipos';
import { types } from '../../context/usuarios/userReducer';
//

export const usePartidos = () => {
  const { partidos, equipos } = useStore();

  const dispatch = useDispatch();
  if (!partidos || !equipos) {
    storePartidos(dispatch);
    storeEquipos(dispatch);
    //return datos(partidos, equipos);
    //return null;
    //return null;
  } else {
    return datos(partidos, equipos);
  }
};

const datos = (partidos, equipos) => {
  let part = [];
  let fase = 1;
  if (fase === 0) {
    part = partidos.filter((p) => p.fase > 0);
  } else {
    part = partidos.filter((p) => p.fase === fase);
  }
  part.map((p) => {
    const power = Math.round(
      equipos.find((eq) => eq.id === p.team1)?.rank +
        equipos.find((eq) => eq.id === p.team2)?.rank
    );
    Number.isNaN(power) ? (p.power = 0) : (p.power = power);
    p.local = equipos.find((eq) => eq.id === p.team1)?.nombre;
    p.visitante = equipos.find((eq) => eq.id === p.team2)?.nombre;
    p.code_loc = equipos.find((eq) => eq.id === p.team1)?.code;
    p.code_vis = equipos.find((eq) => eq.id === p.team2)?.code;
    p.datte = new Date(p.datte);
  });
  part = sortBy(part, ['datte'], ['asc']);
  return part;
};

async function storePartidos(dispatch) {
  const loadPartidos = await cargaPartidos();
  dispatch({
    type: types.cargaPartidos,
    payload: loadPartidos,
  });
}

async function storeEquipos(dispatch) {
  const loadEquipos = await cargaEquipos();
  dispatch({
    type: types.cargaEquipos,
    payload: loadEquipos,
  });
}
