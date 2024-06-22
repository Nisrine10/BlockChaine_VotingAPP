import React, {createContext, useContext, useState, useEffect} from "react";
import {ethers} from "ethers";
import {useNavigate} from "react-router-dom";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAccount = localStorage.getItem("currentAccount");
    if (savedAccount) {
      setCurrentAccount(savedAccount);
      checkAdmin(savedAccount);
    }
  }, [currentAccount]);

  useEffect(() => {
    if (currentAccount) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, []);

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setCurrentAccount(address);
      localStorage.setItem("currentAccount", address);
      await checkAdmin(address);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      // Handle error, e.g., display a message to the user
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
    setIsAdmin(false);
    localStorage.removeItem("currentAccount");
    navigate("/");
  };

  const checkAdmin = (account) => {
    const adminAccounts = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const isAdminAccount =
      adminAccounts.toLowerCase() === account.toLowerCase();
    setIsAdmin(isAdminAccount);
    if (isAdminAccount) {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  return (
    <LoginContext.Provider
      value={{currentAccount, isAdmin, connectWallet, disconnectWallet}}
    >
      {children}
    </LoginContext.Provider>
  );
};
