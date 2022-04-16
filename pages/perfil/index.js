import { Layout } from '../../components';
import { useStore } from '../../context/usuarios/UserProvider';

export default function PerfilPage() {
  const { user, perfil } = useStore();
  //console.log({ datos });

  if (perfil) {
    return (
      <Layout titulo={`Perfil de ${user.name}`}>
        <h2>Perfil de usuario</h2>
        <span> {perfil?.hincha} </span>
      </Layout>
    );
  } else {
    return <h3>NO USER</h3>;
  }
}
