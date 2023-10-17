import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DefiEdge Assignment</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to DefiEdge
        </h1>

        <p className={styles.description}>
          Get started by connecting your wallet
        </p>

      </main>
    </div>
  );
};

export default Home;
