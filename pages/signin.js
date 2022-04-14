import { useState } from 'react';
import {
  getCsrfToken,
  getProviders,
  signIn,
  getSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn({ csrfToken, providers }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [name, setName] = useState('');

  const signupUser = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message === 'Registro etsitoso') {
      await signIn('credentials', { email, password });
      return router.push('/');
    }
  };

  const signInUser = async (e) => {
    e.preventDefault();
    let options = { redirect: false, email, password };
    const res = await signIn('credentials', options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    }
    return router.push('/');
  };

  return (
    <>
      <form>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} />
        <label>
          Nombre
          <input
            type='name'
            id='name'
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label htmlFor='email'>Correo</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <p style={{ color: 'red' }}>{message}</p>
        <button onClick={(e) => signInUser(e)}>Sign IN with credentials</button>
        <button onClick={(e) => signupUser(e)}>Registro</button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: '/' },
    };
  } else {
    //console.log('RREEQQ', req);
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  //console.log('TTKK', csrfToken);

  return {
    props: { csrfToken, providers },
  };
}
