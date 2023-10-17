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
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const account = useAccount();
  const [arrayInput, setInput] = useState("");

  const contractRead = useContractRead<any,any,any>({
    address: "0x3406965957385F420D37ef7b86b2001c30e7F375",
    abi: [
      {
        inputs: [{ internalType: "string", name: "_ticker", type: "string" }],
        name: "getVotes",
        outputs: [
          { internalType: "uint256", name: "up", type: "uint256" },
          { internalType: "uint256", name: "down", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getVotes",
    args: [arrayInput],
  });

  const upVote = contractRead?.data[1]
  const downVote = contractRead?.data[0]

  console.log(contractRead)
  console.log(upVote);

  const { config } = usePrepareContractWrite({
    address: "0x3406965957385F420D37ef7b86b2001c30e7F375",
    abi: [
      {
        inputs: [
          { internalType: "string", name: "_ticker", type: "string" },
          { internalType: "bool", name: "_vote", type: "bool" },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  });

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSetEvent = (event: any) => {
    setInput(event.target.value);
  };
  const { write } = useContractWrite(config);

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
        <p className={styles.description}>
          Enter any ticker from (ETH, BTC, LINK)
        </p>
        {contractRead?.data !== undefined && (
          <>
            <p className={styles.description}>
              Up Votes are `${upVote}`
            </p>
            <p className={styles.description}>
              Down Votes are `{contractRead?.data[0]}`
            </p>
          </>
        )}
        <button onClick={(event) => handleSetEvent(event)} value="ETH">
          {" "}
          Get Votes for ETH
        </button>
        <button onClick={(event) => handleSetEvent(event)} value="BTC">
          {" "}
          Get Votes for BTC
        </button>
        <button onClick={(event) => handleSetEvent(event)} value="LINK">
          {" "}
          Get Votes for LINK
        </button>
      </main>
    </div>
  );
};

export default Home;
