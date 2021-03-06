import { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useMediaQuery,
} from '@chakra-ui/react';

export const TablaPosiciones = ({ datos }) => {
  const [isChiqui] = useMediaQuery('(max-width: 768px)');
  const [grupo, setGrupo] = useState(datos);
  useEffect(() => {
    if (datos) {
      const grupo = datos.map((equipo) => {
        return {
          pais: equipo.nombre,
          pj: equipo.pg + equipo.pe + equipo.pp,
          pg: equipo.pg,
          pe: equipo.pe,
          pp: equipo.pp,
          gf: equipo.gf,
          gc: equipo.gc,
          rank: equipo.rank,
          dg: equipo.gf - equipo.gc,
          pts: equipo.pg * 3 + equipo.pe,
          id: equipo.id,
        };
      });
      grupo = orderBy(
        grupo,
        ['pts', 'dg', 'gf', 'rank'],
        ['desc', 'desc', 'desc', 'desc']
      );
      setGrupo(grupo);
    }
    //console.log(grupo);
    //console.log('La tabla cambia');
  }, [datos]);
  if (!grupo) {
    return <>Sin datos</>;
  }

  return (
    <TableContainer padding={0} margin={0}>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th width='111px'>País</Th>
            <Th width='25px'>Pts</Th>
            {!isChiqui && <Th width='25px'>PJ</Th>}
            <Th width='25px'>PG</Th>
            {!isChiqui && (
              <>
                <Th width='25px'>PE</Th>
                <Th width='25px'>PP</Th>
              </>
            )}
            <Th width='25px'>GF</Th>
            <Th width='25px'>GC</Th>
            <Th width='25px'>DG</Th>
          </Tr>
        </Thead>
        <Tbody>
          {grupo.map(({ id, pais, pj, pg, pe, pp, gf, gc, pts, dg }, index) => (
            <Tr key={id} bg={index < 2 ? 'polla.gana' : 'polla.pierde'}>
              <Td>{pais}</Td>
              <Td>{pts}</Td>
              {!isChiqui && <Td>{pj}</Td>}
              <Td>{pg}</Td>
              {!isChiqui && (
                <>
                  <Td>{pe}</Td>
                  <Td>{pp}</Td>
                </>
              )}
              <Td>{gf}</Td>
              <Td>{gc}</Td>
              <Td>{dg}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

/* 

<table style={{ maxWidth: '600px' }}>
      <thead>
        <tr>
          <th>País</th>

          <th>GOLES</th>
        </tr>
      </thead>
      <tbody>
        {grupo.map(({ id, pais, pj, pg, pe, pp, gf, gc, pts, dg }, index) => (
          <tr key={id} bg={index < 2 ? 'polla.gana' : 'polla.pierde'}>
            <td>
              {pais} {pts} {pj} {pg} {pe} {pp}
            </td>

            <td>
              {gf} {gc} {dg}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

*/

/* <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Pais</Table.HeaderCell>
          <Table.HeaderCell>Puntos</Table.HeaderCell>
          <Table.HeaderCell>PJ</Table.HeaderCell>
          <Table.HeaderCell>PG</Table.HeaderCell>
          <Table.HeaderCell>PE</Table.HeaderCell>
          <Table.HeaderCell>PP</Table.HeaderCell>
          <Table.HeaderCell>GF</Table.HeaderCell>
          <Table.HeaderCell>GC</Table.HeaderCell>
          <Table.HeaderCell>DG</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {grupo.map(({ id, pais, pj, pg, pe, pp, gf, gc, pts, dg }, index) => (
          <Table.Row key={id} as={<Tbody />}>
            <Table.Cell>{pais}</Table.Cell>
            <Table.Cell>{pts}</Table.Cell>
            <Table.Cell>{pj}</Table.Cell>
            <Table.Cell>{pg}</Table.Cell>
            <Table.Cell>{pe}</Table.Cell>
            <Table.Cell>{pp}</Table.Cell>
            <Table.Cell>{gf}</Table.Cell>
            <Table.Cell>{gc}</Table.Cell>
            <Table.Cell>{dg}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table> 

*/
