import { Layout } from '../../components';
import { useStore } from '../../context/usuarios/UserProvider';

export default function PerfilPage({ data }) {
  if (data) {
    console.log(data);
  }
  //const { user, perfil } = useStore();
  //console.log({ datos });

  return (
    <Layout titulo={`Perfil de COMO SE LLAME`}>
      <h2>Perfil de usuario</h2>
    </Layout>
  );
}

/* 
<Layout titulo={`Nuestra Polla - Perfil de ${user?.name}`}>
      <h2>Perfil de usuario</h2>
      <span> {perfil?.hincha} </span>
      <pre>{JSON.stringify(perfil, null, 2)}</pre>
    </Layout>
*/
