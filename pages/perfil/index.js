import { Layout, NavLink } from '../../components';

export default function PerfilPage() {
  return (
    <Layout>
      <h2>Perfil de usuario</h2>
      <NavLink
        nombre='Cambiar contraseña'
        enlace='/perfil/cambiaclave'
      ></NavLink>
    </Layout>
  );
}
