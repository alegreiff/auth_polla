import { Layout } from '../components';
import _ from 'lodash';

import { Table as Mitabla } from 'semantic-ui-react';
//import { Table as Mitabla } from '@chakra-ui/react';
import { useReducer } from 'react';
import { useStore } from '../context/usuarios/UserProvider';

const tableData = [
  { power: 4000, name: 'John', age: 15, gender: 'Male' },
  { power: 3000, name: 'Amber', age: 40, gender: 'Female' },
  { power: 2000, name: 'Leslie', age: 25, gender: 'Other' },
  { power: 1000, name: 'Ben', age: 70, gender: 'Male' },
];

function exampleReducer(state, action) {
  switch (action.type) {
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
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}
export default function FixturePage() {
  /* const { partidos, equipos } = useStore();
  console.log(equipos); */
  const [state, dispatch] = useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  });
  const { column, data, direction } = state;

  return (
    <Layout>
      <Mitabla sortable celled fixed>
        <Mitabla.Header>
          <Mitabla.Row>
            <Mitabla.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
            >
              Name
            </Mitabla.HeaderCell>
            <Mitabla.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'age' })}
            >
              Age
            </Mitabla.HeaderCell>
            <Mitabla.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'gender' })
              }
            >
              Gender
            </Mitabla.HeaderCell>

            <Mitabla.HeaderCell
              sorted={column === 'power' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'power' })}
            >
              Power
            </Mitabla.HeaderCell>
          </Mitabla.Row>
        </Mitabla.Header>
        <Mitabla.Body>
          {data.map(({ age, gender, name, power }) => (
            <Mitabla.Row key={name}>
              <Mitabla.Cell>{name}</Mitabla.Cell>
              <Mitabla.Cell>{age}</Mitabla.Cell>
              <Mitabla.Cell>{gender}</Mitabla.Cell>
              <Mitabla.Cell>{power}</Mitabla.Cell>
            </Mitabla.Row>
          ))}
        </Mitabla.Body>
      </Mitabla>
    </Layout>
  );
}
