import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const account = useAccount();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>DefiEdge Assignment</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <h1 className={styles.title}>Welcome to DefiEdge</h1>
        {account.isConnected ?
        <p className={styles.description}>Hello {account.address}</p> :
        <p className={styles.description}>
          Get started by connecting your wallet
        </p>}
      </main>
    </div>
  );
};

export default Home;
