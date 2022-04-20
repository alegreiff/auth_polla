import { Box, SimpleGrid } from '@chakra-ui/react';
import { Layout } from '../../components';
import { GrupoProno } from '../../components/pronos/grupo';
import { useGrupo } from '../../lib/hooks';

export default function PronmosPage() {
  const grupoA = useGrupo('A');
  const grupoB = useGrupo('B');
  const grupoC = useGrupo('C');
  const grupoD = useGrupo('D');
  const grupoE = useGrupo('E');
  const grupoF = useGrupo('F');
  const grupoG = useGrupo('G');
  const grupoH = useGrupo('H');
  //console.log('M', matches);

  return (
    <Layout>
      {/* <div>{grupoA && <GrupoProno partidos={grupoA} />}</div> */}

      <SimpleGrid columns={[1, null, 1]} spacing='5px'>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='A' partidos={grupoA} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='B' partidos={grupoB} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='C' partidos={grupoC} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='D' partidos={grupoD} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='E' partidos={grupoF} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='F' partidos={grupoF} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='G' partidos={grupoG} />
        </Box>
        <Box bg='tomato' height='auto' padding={1}>
          <GrupoProno grupo='H' partidos={grupoH} />
        </Box>
      </SimpleGrid>
    </Layout>
  );
}
