import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const yuka = useSession();
  console.log(yuka);
  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <Image src={session?.user.image} alt='USER' width={40} height={40} />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <h2>Hola Mundo</h2>
      <button onClick={() => signIn()}>Ingresar</button>
    </>
  );
}
