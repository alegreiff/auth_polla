import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const NumeroInput = ({ cambioNum, match }) => {
  const [partido, setPartido] = useState(match);
  const [mloc, setMloc] = useState();
  const [mvis, setMvis] = useState();
  const changeMloc = (value) => {
    setMloc(value);
  };
  const changeMvis = (value) => {
    setMvis(value);
  };
  useEffect(() => {
    cambioNum(match, mloc, mvis);
  }, [mloc, mvis]);

  return (
    <>
      <HStack>
        <NumberInput
          onChange={changeMloc}
          size='lg'
          defaultValue={mloc}
          min={0}
          max={20}
          width='80px'
          bg={
            mloc > mvis
              ? 'polla.gana'
              : mloc < mvis
              ? 'polla.pierde'
              : 'polla.empata'
          }
        >
          <NumberInputField value={mloc} name='mloc' fontSize='2rem' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <span>
          {' '}
          {match} LOC: {mloc} VIS: {mvis}{' '}
        </span>
        <NumberInput
          onChange={changeMvis}
          size='lg'
          defaultValue={mvis}
          min={0}
          max={20}
          width='80px'
          bg={
            mvis > mloc
              ? 'polla.gana'
              : mvis < mloc
              ? 'polla.pierde'
              : 'polla.empata'
          }
        >
          <NumberInputField value={mvis} name='mvis' fontSize='2rem' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </>
  );
};
