import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractABI from "../abis/MarketSentiment.json";

const Home: NextPage = () => {
  const account = useAccount();
  const ipfsGateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY;

  const contractRead = useContractRead({
    address: "0x3406965957385F420D37ef7b86b2001c30e7F375",
    abi: [
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "owner",
  });

  const { config } = usePrepareContractWrite({
    address: "0x3406965957385F420D37ef7b86b2001c30e7F375",
    abi: [
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
    ],
  });

  const { write: vote, isSuccess } = useContractWrite(config);

  return (
    <div className={styles.container}>
      <Head>
        <title>DefiEdge Assignment</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <h1 className={styles.title}>Welcome to DefiEdge</h1>
        {account.isConnected ? (
          <p className={styles.description}>Hello {account.address}</p>
        ) : (
          <p className={styles.description}>
            Get started by connecting your wallet
          </p>
        )}

        <div>
          {/* <button onClick={contractRead}>Vote for</button> */}
        </div>
        <div>
        <p className={styles.description}>Smart contract owner's address : {contractRead.data}</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
