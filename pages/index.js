import Head from 'next/head';
import CenterHero from '../components/CenterHero';
import LeftHero from '../components/LeftHero';
import SignInHero from '../components/SignInHero';

export default function Home() {
  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="job emploi informatique candidature spontanée" content="Trouver un emploi en informatique en région parisienne" />
      </Head>
      <CenterHero />
      <SignInHero />
      <LeftHero />
    </>

  );
}
