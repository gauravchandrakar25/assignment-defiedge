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
  const [responseData, setResponseData] = useState([]);

  const contractRead = useContractRead<any, any, any>({
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

  // const upVote = contractRead?.data[1]
  // const downVote = contractRead?.data[0]

  console.log(contractRead);
  // console.log(upVote);

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

  const handleSetEvent = (event: any) => {
    setInput(event.target.value);
    setResponseData(contractRead.data);
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
        {!account.isConnected && (
          <p className={styles.description}>
            Get started by connecting your wallet
          </p>
        )}
        {account.isConnected && (
          <>
            <p className={styles.description}>Get vote count of any ticker</p>

            <div className="flex gap-4">
              <button
                onClick={(event) => handleSetEvent(event)}
                value="ETH"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                {" "}
                Get Votes for ETH
              </button>
              <button
                onClick={(event) => handleSetEvent(event)}
                value="BTC"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                {" "}
                Get Votes for BTC
              </button>
              <button
                onClick={(event) => handleSetEvent(event)}
                value="LINK"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                {" "}
                Get Votes for LINK
              </button>
            </div>
            {responseData.length > 0 && (
              <>
                <div className="flex gap-4 mt-3">
                  <p className={styles.description}>
                    Up votes : {String(responseData[1])}
                    {/* Up Votes are `${upVote}` */}
                  </p>
                  <p className={styles.description}>
                    Down Votes : {String(responseData[0])}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
