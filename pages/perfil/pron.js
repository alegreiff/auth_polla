import { useEffect, useState } from 'react';
import { Layout } from '../../components';
import { useStore } from '../../context/usuarios/UserProvider';
import { useCargaPronosPollero, useGrupo } from '../../lib/hooks';

export default function PronosUserPage() {
  const { perfil } = useStore();
  const { arePronos, isLoading, isError } = useCargaPronosPollero(perfil?._id);

  const grupoA = useGrupo('A');
  const grupoB = useGrupo('B');
  const grupoC = useGrupo('C');
  const grupoD = useGrupo('D');
  const grupoE = useGrupo('E');
  const grupoF = useGrupo('F');
  const grupoG = useGrupo('G');
  const grupoH = useGrupo('H');

  const [pronos, setPronos] = useState([]);
  useEffect(() => {
    if (arePronos) {
      console.log(arePronos[1]);
      const pronosA = arePronos[1].filter((prono) => prono[0] === 'A');
      const pronosB = arePronos[1].filter((prono) => prono[0] === 'B');
      const pronosC = arePronos[1].filter((prono) => prono[0] === 'C');
      const pronosD = arePronos[1].filter((prono) => prono[0] === 'D');
      const pronosE = arePronos[1].filter((prono) => prono[0] === 'E');
      const pronosF = arePronos[1].filter((prono) => prono[0] === 'F');
      const pronosG = arePronos[1].filter((prono) => prono[0] === 'G');
      const pronosH = arePronos[1].filter((prono) => prono[0] === 'H');
      setPronos(
        pronosA,
        pronosB,
        pronosC,
        pronosD,
        pronosE,
        pronosF,
        pronosG,
        pronosH
      );
    }
  }, []);

  console.log(pronos[4]);

  return (
    <Layout>
      <h4>La página de los pronos</h4>

      {isLoading ? (
        'CARGANDO PRONOS'
      ) : isError ? (
        'ERROR ERROR'
      ) : (
        <pre>{JSON.stringify(arePronos, null, 5)}</pre>
      )}
    </Layout>
  );
}
