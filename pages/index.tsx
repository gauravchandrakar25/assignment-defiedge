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
import { useState } from "react";

const Home: NextPage = () => {
  const account = useAccount();
  const [arrayInput, setInput] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [voteFlag, setVoteFlag] = useState(false);
  const [getVoteFlag, setGetVoteFlag] = useState(false);
  const contractAddress = "0x3406965957385F420D37ef7b86b2001c30e7F375";
  const [tokenName, setTokenname] = useState("");
  const [vote, setVote] = useState(null);
  let contractRead: any;

  if (!tokenName && vote != null) {
    contractRead = useContractRead<any, any, any>({
      address: contractAddress,
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
  }

  const {
    config,
    isLoading,
    isError: fromVote,
    error: voteError,
    data: writeData,
  } = usePrepareContractWrite({
    address: contractAddress,
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
    functionName: "vote",
    args: [tokenName, Boolean(vote)],
  });

  if (fromVote) {
    alert(voteError?.message);
  }

  const handleSetEvent = (event: any) => {
    setInput(event.target.value);
    setResponseData(contractRead?.data);
  };

  const handleFlag = () => {
    setVoteFlag((current) => !current);
    setGetVoteFlag(false);
  };

  const handleGetVoteFlag = () => {
    setGetVoteFlag((current) => !current);
    setVoteFlag(false);
  };

  const { write, isSuccess, data } = useContractWrite(config);

  const voteETH = (e: any) => {
    setTokenname("ETH");
    setVote(e.target.value);
    !isLoading && write?.();
  };

  const voteBTC = (e: any) => {
    setTokenname("BTC");
    setVote(e.target.value);
    !isLoading && write?.();
  };
  const voteLINK = (e: any) => {
    setTokenname("LINK");
    setVote(e.target.value);
    !isLoading &&  write?.();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>DefiEdge Assignment</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to DefiEdge</h1>
          {!account.isConnected && (
            <p className={styles.description}>
              Get started by connecting your wallet
            </p>
          )}
        </div>
        <ConnectButton />
        {account?.isConnected && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleGetVoteFlag}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              {" "}
              Get vote count
            </button>
            <button
              onClick={handleFlag}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              {" "}
              Vote
            </button>
          </div>
        )}

        {account?.isConnected && getVoteFlag && (
          <>
            <div className="flex gap-4 mt-3">
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
            {responseData?.length > 0 && (
              <>
                <div className="flex gap-4 mt-3">
                  <p className={styles.description}>
                    Up votes : {String(responseData[1])}
                  </p>
                  <p className={styles.description}>
                    Down Votes : {String(responseData[0])}
                  </p>
                </div>
              </>
            )}
          </>
        )}

        {/* Vote Functionality */}

        {account?.isConnected && voteFlag && (
          <div className="flex gap-40">
            <div className="text-center mt-5">
              <h4 className="text-2xl">ETH</h4>
              <div className="flex gap-8 mt-3">
                <button
                  type="button"
                  onClick={(e) => voteETH(e)}
                  value={"true"}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  {" "}
                  Up
                </button>
                <button
                  onClick={(e) => voteETH(e)}
                  value={"false"}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                  {" "}
                  Down
                </button>
              </div>
            </div>

            <div className="text-center mt-5">
              <h4 className="text-2xl">BTC</h4>
              <div className="flex gap-8 mt-3">
                <button
                  onClick={(e) => voteBTC(e)}
                  value={"true"}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  {" "}
                  Up
                </button>
                <button
                  onClick={(e) => voteBTC(e)}
                  value={"false"}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                  {" "}
                  Down
                </button>
              </div>
            </div>

            <div className="text-center mt-5">
              <h4 className="text-2xl">LINK</h4>
              <div className="flex gap-8 mt-3">
                <button
                  onClick={(e) => voteLINK(e)}
                  value={"true"}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  {" "}
                  Up
                </button>
                <button
                  onClick={(e) => voteLINK(e)}
                  value={"false"}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                  {" "}
                  Down
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
