import { Badge } from '@chakra-ui/react';
import { Table } from 'semantic-ui-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BanderaPais } from '../tablas';
import { NumeroInput } from '../forms/NumeroInput';
import { useEffect, useState } from 'react';
import { useEquiposGrupo } from '../../lib/hooks/useEquiposGrupo';
import { cloneDeep } from 'lodash';
import { TablaPosiciones } from './tablaPos';

export const GrupoProno = ({ partidos, grupo }) => {
  //const [global, setGlobal] = useState(0);
  const [matchesOk, setMatchesOk] = useState(0);
  const [numPartidos, setNumPartidos] = useState([]);
  const equipos = useEquiposGrupo(grupo);
  const [grupoEquipos, setGrupoEquipos] = useState(null);
  const [carga, setCarga] = useState(false);

  useEffect(() => {
    if (carga === true) {
      return;
    }

    if (equipos) {
      let temporal = cloneDeep(equipos);
      console.log('MKJ');
      setCarga(true);
      setGrupoEquipos(temporal);
    }
  }, [equipos]);

  useEffect(() => {
    //console.log('Cambio en NUMpartidos');
    if (grupoEquipos) {
      anula();
    }

    function anula() {
      let temporalGrupo = cloneDeep(grupoEquipos);
      temporalGrupo = temporalGrupo.map((temp) => {
        return {
          ...temp,
          pg: 0,
          pe: 0,
          pp: 0,
          gf: 0,
          gc: 0,
        };
      });
      //setGrupoEquipos(temporalGrupo);

      numPartidos.forEach((PARTIDO) => {
        if (PARTIDO.mloc && PARTIDO.mvis) {
          const RESULTADO =
            PARTIDO.mloc > PARTIDO.mvis
              ? 'GANALOCAL'
              : PARTIDO.mloc < PARTIDO.mvis
              ? 'GANAVISITANTE'
              : 'EMPATE';

          const LO = temporalGrupo.find((equipo) => equipo.id === PARTIDO.loc);
          const VI = temporalGrupo.find((equipo) => equipo.id === PARTIDO.vis);
          LO.gf = LO.gf + Number(PARTIDO.mloc);
          LO.gc = LO.gc + Number(PARTIDO.mvis);
          VI.gf = VI.gf + Number(PARTIDO.mvis);
          VI.gc = VI.gc + Number(PARTIDO.mloc);

          switch (RESULTADO) {
            case 'GANALOCAL':
              LO.pg = LO.pg + 1;
              VI.pp = VI.pp + 1;
              break;
            case 'GANAVISITANTE':
              VI.pg = VI.pg + 1;
              LO.pp = LO.pp + 1;
              break;
            case 'EMPATE':
              VI.pe = VI.pe + 1;
              LO.pe = LO.pe + 1;
              break;

            default:
              break;
          }

          console.info(
            `El partido entre ${LO.nombre} vs ${VI.nombre} ahora está ${PARTIDO.mloc} vs ${PARTIDO.mvis} y claramente es un  ${RESULTADO}`
          );
        }
      });

      setGrupoEquipos(temporalGrupo);
    }
  }, [numPartidos]);

  useEffect(() => {
    if (partidos) {
      const idPartidos = partidos.map((partido) => {
        return {
          partido: partido.match,
          pronosticado: false,
          comodin: false,
          loc: partido.team1,
          mloc: null,
          vis: partido.team2,
          mvis: null,
        };
      });
      setNumPartidos(idPartidos);
    }
  }, [partidos]);
  useEffect(() => {
    const mOk = numPartidos.filter((m) => m.pronosticado).length;
    setMatchesOk(mOk);
  }, [numPartidos]);

  const estadoNumeros = (match, loc, vis) => {
    //console.log('PARTIDO: ', match, 'LOC', loc, 'VIS', vis);

    if (numPartidos.length > 0) {
      let actualPartido = numPartidos.find((p) => p.partido === match);
      let nuevopartido = {};
      if (loc && vis) {
        nuevopartido = {
          partido: match,
          comodin: actualPartido.comodin,
          loc: actualPartido.loc,
          vis: actualPartido.vis,
          pronosticado: true,
          mloc: loc,
          mvis: vis,
        };
        //cambiaEstadoGrupo(match, loc, vis);
      } else {
        nuevopartido = {
          partido: match,
          comodin: actualPartido.comodin,
          loc: actualPartido.loc,
          vis: actualPartido.vis,
          pronosticado: false,
          mloc: null,
          mvis: null,
        };
        //anulaMarcador();
      }
      //console.log('ANULA MARCADOR');

      const otrosPartidos = numPartidos.filter((p) => p.partido !== match);
      setNumPartidos([...otrosPartidos, nuevopartido]);
    }
  };

  if (!partidos) {
    return (
      <>
        <h6>Mundial Colombia 86</h6>
      </>
    );
  }

  if (!grupoEquipos) {
    return (
      <>
        <h6>Mundial Colombia 2045</h6>
      </>
    );
  }
  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Badge fontSize='3xl'>Grupo</Badge>
              <Badge colorScheme='green' fontSize='5xl'>
                {grupo}
              </Badge>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {partidos.map(
            ({ match, local, visitante, datte, code_loc, code_vis }) => (
              <Table.Row key={match}>
                <Table.Cell>
                  {/* <FechaSingle date={datte} /> */}
                  {format(datte, "dd 'de' MMM H':'mm a", { locale: es })}
                </Table.Cell>
                <Table.Cell>com</Table.Cell>
                <Table.Cell>
                  <BanderaPais bandera={code_loc} nombre={local} />
                </Table.Cell>
                <Table.Cell>
                  <NumeroInput cambioNum={estadoNumeros} match={match} />
                </Table.Cell>
                <Table.Cell>
                  <BanderaPais bandera={code_vis} nombre={visitante} />
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <TablaPosiciones datos={grupoEquipos} />
              <Badge fontSize='3rem' colorScheme='green'>
                {matchesOk}
              </Badge>

              {/* <span> {numPartidos.length} </span>
              <span> {global} </span>
              <pre>{JSON.stringify(numPartidos, null, 2)}</pre> */}

              {/* <pre>{JSON.stringify(grupoEquipos, null, 2)}</pre> */}

              {/* <pre>{JSON.stringify(numPartidos, null, 2)}</pre> */}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

/* 


  /* const anulaMarcador = () => {
    let temporalGrupo = cloneDeep(grupoEquipos);
    temporalGrupo = temporalGrupo.map((temp) => {
      return {
        ...temp,
        pg: 0,
        pe: 0,
        pp: 0,
        gf: 0,
        gc: 0,
      };
    });
    //setGrupoEquipos(temporalGrupo);

    numPartidos.forEach((PARTIDO) => {
      if (PARTIDO.mloc && PARTIDO.mvis) {
        const RESULTADO =
          PARTIDO.mloc > PARTIDO.mvis
            ? 'GANALOCAL'
            : PARTIDO.mloc < PARTIDO.mvis
            ? 'GANAVISITANTE'
            : 'EMPATE';

        const LO = temporalGrupo.find((equipo) => equipo.id === PARTIDO.loc);
        const VI = temporalGrupo.find((equipo) => equipo.id === PARTIDO.vis);
        LO.gf = LO.gf + Number(PARTIDO.mloc);
        LO.gc = LO.gc + Number(PARTIDO.mvis);
        VI.gf = VI.gf + Number(PARTIDO.mvis);
        VI.gc = VI.gc + Number(PARTIDO.mloc);

        switch (RESULTADO) {
          case 'GANALOCAL':
            LO.pg = LO.pg + 1;
            VI.pp = VI.pp + 1;
            break;
          case 'GANAVISITANTE':
            VI.pg = VI.pg + 1;
            LO.pp = LO.pp + 1;
            break;
          case 'EMPATE':
            VI.pe = VI.pe + 1;
            LO.pe = LO.pe + 1;
            break;

          default:
            break;
        }

        console.info(
          `El partido entre ${LO.nombre} vs ${VI.nombre} ahora está ${PARTIDO.mloc} vs ${PARTIDO.mvis} y claramente es un  ${RESULTADO}`
        );
      }
    });

    setGrupoEquipos(temporalGrupo);
  }; */

/*   const cambiaEstadoGrupo = (partido, mloc, mvis) => {
    const temporalGrupo = cloneDeep(grupoEquipos);

    numPartidos.forEach((PARTIDO) => {
      if (partido === PARTIDO.partido) {
        const RESULTADO =
          mloc > mvis ? 'GANALOCAL' : mloc < mvis ? 'GANAVISITANTE' : 'EMPATE';

        const LO = temporalGrupo.find((equipo) => equipo.id === PARTIDO.loc);
        const VI = temporalGrupo.find((equipo) => equipo.id === PARTIDO.vis);
        LO.gf = LO.gf + Number(mloc);
        LO.gc = LO.gc + Number(mvis);
        VI.gf = VI.gf + Number(mvis);
        VI.gc = VI.gc + Number(mloc);

        switch (RESULTADO) {
          case 'GANALOCAL':
            LO.pg = LO.pg + 1;
            VI.pp = VI.pp + 1;
            break;
          case 'GANAVISITANTE':
            VI.pg = VI.pg + 1;
            LO.pp = LO.pp + 1;
            break;
          case 'EMPATE':
            VI.pe = VI.pe + 1;
            LO.pe = LO.pe + 1;
            break;

          default:
            break;
        }

        console.info(
          `El partido entre ${LO.nombre} vs ${VI.nombre} ahora está ${mloc} vs ${mvis} y claramente es un  ${RESULTADO}`
        );
      }
    });

    setGrupoEquipos(temporalGrupo);
  }; */
