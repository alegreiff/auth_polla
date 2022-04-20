import { Badge } from '@chakra-ui/react';
import { Table } from 'semantic-ui-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BanderaPais } from '../tablas';
import { NumeroInput } from '../forms/NumeroInput';
import { useEffect, useState } from 'react';

export const GrupoProno = ({ partidos, grupo }) => {
  const [global, setGlobal] = useState(0);
  const [matchesOk, setMatchesOk] = useState(0);
  const [numPartidos, setNumPartidos] = useState([]);
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
      }

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
              <Badge fontSize='3rem' colorScheme='green'>
                {matchesOk}
              </Badge>

              {/* <span> {numPartidos.length} </span>
              <span> {global} </span>
              <pre>{JSON.stringify(numPartidos, null, 2)}</pre> */}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

/*  

{
  "_id": "625ee33e347e53ba40ab1f40",
  "match": 1,
  "team1": 24,
  "team2": 11,
  "datte": "2022-11-21T16:00:00.000Z",
  "hour": 19,
  "estadio": 2,
  "fase": 1,
  "grupo": "A",
  "procesado": false,
  "createdAt": "2022-04-19T16:28:46.464Z",
  "updatedAt": "2022-04-19T16:28:46.464Z",
  "__v": 0,
  "power": 2894,
  "local": "Qatar",
  "visitante": "Ecuador",
  "code_loc": "QA",
  "code_vis": "EC"
}

*/
