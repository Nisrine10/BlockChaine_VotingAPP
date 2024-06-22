import React from "react";
import {ethers} from "ethers";

const Login = ({setAccount}) => {
  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div>
      <h1>Login to Decentralized Voting System</h1>
      <button onClick={connectWallet}>Connect MetaMask</button>
    </div>
  );
};

export default Login;
