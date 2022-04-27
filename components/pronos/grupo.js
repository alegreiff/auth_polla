import {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
} from '@chakra-ui/react';
import { Table } from 'semantic-ui-react';
import { BanderaPais, FechaSimple } from '../tablas';
import { NumeroInput } from '../forms/NumeroInput';
import { useEffect, useState } from 'react';
import { useEquiposGrupo } from '../../lib/hooks/useEquiposGrupo';
import { cloneDeep } from 'lodash';
import { TablaPosiciones } from './tablaPos';
import { useStore } from '../../context/usuarios/UserProvider';
import { useCargaPerfil } from '../../lib/hooks/useCargaPerfil';

export const GrupoProno = ({ partidos, grupo }) => {
  const { perfil, user } = useStore();
  const [matchesOk, setMatchesOk] = useState(0);
  const [numPartidos, setNumPartidos] = useState([]);
  const equipos = useEquiposGrupo(grupo);
  const [grupoEquipos, setGrupoEquipos] = useState(null);
  const [carga, setCarga] = useState(false);
  const [comodines, setComodines] = useState(0);

  const { arePronos, isLoading, isError } = useCargaPerfil(perfil?._id);
  //console.log(profilepollerio);

  useEffect(() => {
    if (carga === true) {
      return;
    }

    if (equipos) {
      let temporal = cloneDeep(equipos);
      //console.log('MKJ');
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
  const estadoComodin = (match) => {
    const id = Number(match);
    if (numPartidos.length > 0) {
      return numPartidos.find((p) => p.partido === id).comodin;
    }
  };
  const cambiaComodin = (id, estado) => {
    const match = Number(id.split('-')[1]);
    if (numPartidos) {
      let temporal = cloneDeep(numPartidos);
      const partidos = temporal.forEach((p) => {
        if (p.partido === match) {
          //console.log('SISAS');
          p.comodin = !p.comodin;
        } else {
          //console.log('PARRAS');
        }
        //setNumPartidos(partidos);
      });
      //console.log(temporal);
      const numeroComodines = temporal.filter((temp) => temp.comodin).length;
      setComodines(numeroComodines);
      setNumPartidos(temporal);
    } else {
      //console.log('NO hay numPartidos');
    }

    /* console.log(
      `El partido ${id} tiene comodín: ${estado} y s el partido nùmero: ${match}`
    ); */
  };

  const setMarcadorProno = (match) => {
    if (arePronos) {
      const partido = arePronos.find((part) => part.match === match);
      if (partido) {
        return [partido.mloc, partido.mvis];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const guardaGrupo = async () => {
    const ID = perfil._id;
    const response = await fetch('/api/polla/pronos', {
      method: 'POST',
      body: JSON.stringify({ numPartidos, ID }),

      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    //console.log('RES', data);
  };

  if (isLoading || isError) {
    return (
      <>
        <span>
          ...no hay nada aquí, solo una tarde en que se puede respirar
        </span>
      </>
    );
  }

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
        <h6>No es mi polla, no es tu polla. Es Nuestra Polla</h6>
      </>
    );
  }

  return (
    <>
      <CheckboxGroup
        colorScheme='green'
        //defaultValue={['comodin-1', 'comodin-2']}
      >
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
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
                    <FechaSimple fecha={datte} />
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Checkbox value={`comodin-${match}`} /> */}
                    <Checkbox
                      size='lg'
                      disabled={
                        !estadoComodin(match) && comodines === 2 ? true : false
                      }
                      colorScheme='red'
                      value={`comodin-${match}`}
                      name={`comodin-${match}`}
                      data-partido={match}
                      onChange={(e) => {
                        cambiaComodin(e.target.value, e.target.checked);
                      }}
                    />

                    {/* <Switch colorScheme='red' name={`comodin-${match}`} /> */}
                  </Table.Cell>
                  <Table.Cell>
                    <HStack justifyContent='center'>
                      <BanderaPais
                        bandera={code_loc}
                        nombre={local}
                        tipo='local'
                      />
                      <NumeroInput
                        cambioNum={estadoNumeros}
                        match={match}
                        score={setMarcadorProno(match)}
                      />
                      <BanderaPais
                        bandera={code_vis}
                        nombre={visitante}
                        tipo='visitante'
                      />
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Button
                  onClick={guardaGrupo}
                  disabled={matchesOk < 6 || comodines < 2}
                >
                  GUARDA GRUPOS
                </Button>
                Pronosticados:{' '}
                <Badge fontSize='2rem' colorScheme='green'>
                  {matchesOk}
                </Badge>
                Comodines:{' '}
                <Badge fontSize='2rem' colorScheme='purple'>
                  {comodines}
                </Badge>
                {isLoading ? (
                  'CARGANDO PRONOS'
                ) : isError ? (
                  'ERROR ERROR'
                ) : (
                  <pre>{JSON.stringify(arePronos, null, 2)}</pre>
                )}
                {/* <pre>{JSON.stringify(numPartidos, null, 2)}</pre> */}
                {/* <span> {numPartidos.length} </span>
              <span> {global} </span>
              <pre>{JSON.stringify(numPartidos, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(grupoEquipos, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(numPartidos, null, 2)}</pre> */}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </CheckboxGroup>
      <TablaPosiciones datos={grupoEquipos} />
    </>
  );
};
