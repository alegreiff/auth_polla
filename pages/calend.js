import { BanderaPais, EstrellasPartido, Layout } from '../components';
import { sortBy } from 'lodash';

import { Flag, Label, Rating, Table as Mitabla } from 'semantic-ui-react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { usePartidos } from '../lib/usePartidos';
import { useStore } from '../context/usuarios/UserProvider';
import { FechaSingle } from '../components/tablas/FechaSingle';
import { Button, Center, HStack, Text } from '@chakra-ui/react';

const tableData = [
  { power: 4000, name: 'John', age: 15, gender: 'Male' },
  { power: 3000, name: 'Amber', age: 40, gender: 'Female' },
  { power: 2000, name: 'Leslie', age: 25, gender: 'Other' },
  { power: 1000, name: 'Ben', age: 70, gender: 'Male' },
];

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return {
        column: action.column,
        data: sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

export default function CalendPage() {
  const store = useStore();
  const datosPartidos = usePartidos();

  const [state, dispatch] = useReducer(exampleReducer, {
    column: null,
    data: datosPartidos,
    direction: null,
  });
  const { column, data, direction } = state;

  useEffect(() => {
    if (!data) {
      dispatch({
        type: 'CHANGE_DATA',
        payload: datosPartidos,
      });
    }
  }, [data, datosPartidos]);

  if (!data) {
    return (
      <Layout>
        No matches yet {datosPartidos?.length} -- {data?.length}{' '}
      </Layout>
    );
  }

  return (
    <Layout>
      <h6>Estamos probando</h6>
      <Mitabla sortable style={{ background: 'none' }}>
        <Mitabla.Header>
          <Mitabla.Row>
            <Mitabla.HeaderCell
              sorted={column === 'datte' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'datte' })}
            >
              FECHA
            </Mitabla.HeaderCell>

            <Mitabla.HeaderCell
              sorted={column === 'grupo' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'grupo' })}
            >
              Grupo
            </Mitabla.HeaderCell>

            <Mitabla.HeaderCell>Match</Mitabla.HeaderCell>
            <Mitabla.HeaderCell>Match</Mitabla.HeaderCell>

            <Mitabla.HeaderCell
              sorted={column === 'power' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'power' })}
            >
              Juerza
            </Mitabla.HeaderCell>
          </Mitabla.Row>
        </Mitabla.Header>
        <Mitabla.Body>
          {data &&
            data.map(
              ({
                _id,
                local,
                visitante,
                power,
                datte,
                code_loc,
                code_vis,
                grupo,
              }) => (
                <Mitabla.Row key={_id}>
                  <Mitabla.Cell>
                    <FechaSingle date={datte} />
                  </Mitabla.Cell>
                  <Mitabla.Cell>
                    <Center>
                      <Text fontSize='4xl' color='grey'>
                        {grupo}
                      </Text>
                    </Center>
                  </Mitabla.Cell>

                  <Mitabla.Cell>
                    {local}
                    <span fontSize='28px'>
                      <Flag
                        name={code_loc.toLowerCase()}
                        className='locabandera'
                      />
                    </span>

                    {/* <BanderaPais bandera={code_loc} nombre={local} /> */}
                  </Mitabla.Cell>
                  <Mitabla.Cell>
                    <Flag
                      name={code_vis.toLowerCase()}
                      className='locabandera'
                    />
                    {visitante}
                    {/* <BanderaPais bandera={code_vis} nombre={visitante} /> */}
                  </Mitabla.Cell>

                  <Mitabla.Cell>
                    {power}
                    {power > 3350 ? (
                      <Rating
                        icon='star'
                        defaultRating={5}
                        maxRating={5}
                        disabled
                      />
                    ) : power > 3260 ? (
                      <Rating
                        icon='star'
                        defaultRating={5}
                        maxRating={4}
                        disabled
                      />
                    ) : power > 3150 ? (
                      <Rating
                        icon='star'
                        defaultRating={5}
                        maxRating={3}
                        disabled
                      />
                    ) : power > 3080 ? (
                      <Rating
                        icon='star'
                        defaultRating={5}
                        maxRating={2}
                        disabled
                      />
                    ) : (
                      <Rating
                        icon='star'
                        defaultRating={5}
                        maxRating={1}
                        disabled
                      />
                    )}
                  </Mitabla.Cell>
                </Mitabla.Row>
              )
            )}
        </Mitabla.Body>
      </Mitabla>
    </Layout>
  );
}
