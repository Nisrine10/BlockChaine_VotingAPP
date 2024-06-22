import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLoginContext} from "../context/LoginContext";

const Welcome = () => {
  const {connectWallet, currentAccount, isAdmin} = useLoginContext();
  const navigate = useNavigate();




  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <div className="container my-5 text-center">
      <div className="bg-[#1c1c24] w-full rounded p-6 h-full">
        <h1 className="font-epilogue font-semibold text-[48px] text-white text-center">
          Welcome to the Voting DApp
        </h1>
        <p className="font-epilogue font-semibold text-[28px] text-white text-center mb-[200px]">
          Please connect your MetaMask wallet to continue.
          
        </p>
        <p className="font-epilogue font-semibold text-[24px] text-white text-center mb-[200px]">
         Your Adress:<br/>
          {currentAccount}
        </p>
        <button
          className="font-epilogue font-semibold text-[16px] leading-[26px] text-white bg-[#E88D67] min-h-[52px] px-4 rounded-[10px]"
          onClick={handleConnectWallet}
        >
          Connect MetaMask
        </button>
      </div>
    </div>
  );
};

export default Welcome;
