import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "../components/ui";

export default function Home() {
  const router = useRouter();
  const ingreso = () => {
    router.push("/pollero/signin");
  };
  const registro = () => {
    router.push("/pollero/register");
  };
  return (
    <Layout titulo="Inicio">
      <VStack padding={4} mx="auto" justifyContent="center">
        <h4>Voy a la ciudad...</h4>
        <Button variant="solid" bg="lime" onClick={ingreso}>
          Deseo ingresar
        </Button>
        <Button variant="ghost" onClick={registro}>
          Deseo realizar el registro básico
        </Button>
      </VStack>
    </Layout>
  );
}

/* export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/pollero/signin' },
    };
  } else {
    console.log('Hay una sessión');
  }
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
} */
