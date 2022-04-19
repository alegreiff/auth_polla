import DB from '../lib/connectDb';
import { Layout, TablaFechas } from '../components';
import Partido from '../models/Partido';
import Equipo from '../models/Equipo';
import { useDispatch } from '../context/usuarios/UserProvider';
import { useEffect, useState } from 'react';
import { types } from '../context/usuarios/userReducer';

import { sortBy } from 'lodash';

export default function CalendarioPage({ partidos, equipos }) {
  const dispatch = useDispatch();
  const [matches, setMatches] = useState(null);
  const [fase, setFase] = useState(1);

  useEffect(() => {
    if (partidos) {
      dispatch({
        type: types.cargaPartidos,
        payload: partidos,
      });
    }
  }, [partidos, dispatch]);

  useEffect(() => {
    if (equipos) {
      dispatch({
        type: types.cargaEquipos,
        payload: equipos,
      });
    }
  }, [equipos, dispatch]);

  useEffect(() => {
    let part = [];
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

    setMatches(part);
  }, [fase, equipos, partidos]);

  //console.log(matches[0]);

  return (
    <Layout titulo='Calendario'>
      {matches && <TablaFechas datos={matches} />}
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  DB();

  const equipos = await Equipo.find();
  const partidos = await Partido.find();

  return {
    props: {
      partidos: JSON.parse(JSON.stringify(partidos)),
      equipos: JSON.parse(JSON.stringify(equipos)),
    },
  };
};
