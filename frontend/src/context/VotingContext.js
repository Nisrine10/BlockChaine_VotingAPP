import React, {createContext, useContext, useState, useEffect} from "react";
import {ethers} from "ethers";
import axios from "axios";
import config from "../config";
import VotingFactory from "../VotingFactory.json";
import Voting from "../Voting.json";
import {useLoginContext} from "./LoginContext";

const VotingContext = createContext();

export const useVotingContext = () => useContext(VotingContext);

export const VotingProvider = ({children}) => {
  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [region, setRegion] = useState("");
  const [votings, setVotings] = useState([]);
  const [selectedVoting, setSelectedVoting] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [voters, setVoters] = useState([]);
  const [voterImageLink, setImageLink] = useState("");
  const [CinLink, setCINLink] = useState("");
  const [votingEndTime, setVotingEndTime] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [winningCandidate, setWinningCandidate] = useState(null);

  const {currentAccount, isAdmin} = useLoginContext();

  const pinataApiKey = "8cd713102f4acd5fb501";
  const pinataSecretApiKey =
    "7af7a9bf7e32d397eab2b86d9f3739cd26c51fcc7d813f2f5609e39b73f492b1";

  useEffect(() => {
    if (currentAccount) {
      loadVotings();
      getMaxVotes(candidates);
     
    }
  }, [currentAccount]);

  useEffect(() => {
    if (currentAccount && selectedVoting) {
      checkApprovalStatus(selectedVoting);
      getVotingEndTime(selectedVoting);
      loadVoters(selectedVoting);
    }
  }, [currentAccount, selectedVoting]);

  const loadVotings = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const factory = new ethers.Contract(
        config.factoryAddress,
        VotingFactory.abi,
        provider
      );
     
      const votingsList = await factory.getVotings();
      setVotings(votingsList);
       console.log("====================================");
       console.log(votingsList);
       console.log("====================================");
    } catch (error) {
      console.error("Error fetching votings:", error);
    }
  };

  const loadVoters = async (votingAddress) => {
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const voting = new ethers.Contract(votingAddress, Voting.abi, provider);
      const votersList = [];
      const votersCount = await voting.getVotersCount();
      for (let i = 0; i < votersCount; i++) {
        const voterAddress = await voting.getVoterAddress(i);
        const voter = await voting.voters(voterAddress);
        votersList.push({
          address: voterAddress,
          name: voter.name,
          cin: voter.cin,
          image: voter.imageLink,
          cinImage: voter.cinLink,
          region: voter.region,
          isApproved: voter.isApproved,
        });
      }
      setVoters(votersList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching voters:", error);
      setIsLoading(false);
    }
  };

  const registerVoter = async () => {
    if (!name || !cin || !region || !voterImageLink || !CinLink) {
      alert("Please enter all information.");
      return;
    }

    if (!selectedVoting) {
      alert("Please select a voting session.");
      return;
    }

    try {
      setIsLoading(true);

      const [imageUrl, cinUrl] = await Promise.all([
        uploadToPinata(voterImageLink, "Voter image uploaded using Pinata"),
        uploadToPinata(CinLink, "CIN image uploaded using Pinata"),
      ]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const voting = new ethers.Contract(selectedVoting, Voting.abi, signer);

      await voting.registerVoter(name, cin, region, imageUrl, cinUrl);
      alert("Registered successfully. Waiting for admin approval.");
      setIsRegistered(true);
      checkApprovalStatus(selectedVoting);
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering voter:", error);
      alert("Failed to register voter.");
      setIsLoading(false);
    }
  };

  const uploadToPinata = async (file, description) => {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        description,
      },
    });

    formData.append("pinataMetadata", metadata);
    formData.append("pinataOptions", JSON.stringify({cidVersion: 1}));

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`;
  };

  const getMaxVotes = (candidates) => {
    let maxVotes = 0;
    let winningCandidate = "";

    for (const candidate of candidates) {
     
      if (parseInt(candidate[3]) > maxVotes) {
        maxVotes = parseInt(candidate[3]);
        winningCandidate = candidate;
      }
    }

     console.log("=======================heeere=============");
     console.log(winningCandidate);
     console.log("====================================");

    setWinningCandidate(winningCandidate);

    
    
  };

  const loadCandidates = async (votingAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const voting = new ethers.Contract(votingAddress, Voting.abi, provider);
      const candidatesList = [];
      const candidatesCount = await voting.candidatesCount();
      for (let i = 0; i < candidatesCount; i++) {
        const candidate = await voting.getCandidate(i);
        
        candidatesList.push(candidate);
     
      }
      setCandidates(candidatesList);

      

      
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const checkApprovalStatus = async (votingAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const voting = new ethers.Contract(votingAddress, Voting.abi, provider);
      const approved = await voting.isVoterApproved(currentAccount);
      setIsApproved(approved);
    } catch (error) {
      console.error("Error checking approval status:", error);
    }
  };

  const selectVoting = (votingAddress) => {
    setSelectedVoting(votingAddress);
    loadCandidates(votingAddress);
    checkApprovalStatus(votingAddress);
    getVotingEndTime(votingAddress);
    loadVoters(votingAddress);
  };

  const vote = async (candidateIndex) => {
    try {
      setIsLoading(true);
      console.log(candidateIndex);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const voting = new ethers.Contract(selectedVoting, Voting.abi, signer);
      const tx = await voting.vote(candidateIndex);
        setIsLoading(true);

      tx.wait();
            setIsLoading(false);

      alert("Voted successfully.");
      setIsLoading(false);
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to vote.");
      setIsLoading(false);
    }
  };

  

  const getVotingEndTime = async (votingAddress) => {
    try {
      console.log(votingAddress)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const voting = new ethers.Contract(votingAddress, Voting.abi, provider);
      const endTime = await voting.votingEndTime();
      setVotingEndTime(endTime.toNumber());
      
    } catch (error) {
      console.error("Error fetching voting end time:", error);
    }
  };

  const checkVoterVoteStatus = async () => {
    try {
      // Call the smart contract function to check if the voter has voted
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const voting = new ethers.Contract(selectedVoting, Voting.abi, provider);
      const hasVoted = await voting.hasVoted(currentAccount);
      setHasVoted(hasVoted);
    } catch (error) {
      console.error("Error checking voter vote status:", error);
    }
  };

  const createVotingSession = async () => {
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factory = new ethers.Contract(
        config.factoryAddress,
        VotingFactory.abi,
        signer
      );
      const tx = await factory.createVoting();
      tx.wait()
      alert("Voting session created successfully.");
      loadVotings();
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating voting session:", error);
      alert("Failed to create voting session.");
      setIsLoading(false);
    }
  };

  const startVotingSession = async (duration) => {
    if (!duration) {
      alert("Please enter a voting duration.");
      return;
    }

    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const voting = new ethers.Contract(selectedVoting, Voting.abi, signer);
      const tx = await voting.startVoting(parseInt(duration));
      await tx.wait();
      const endTime = Math.floor(Date.now() / 1000) + parseInt(duration);
      setVotingEndTime(endTime);
      alert("Voting session started successfully.");
      setIsLoading(false);
    } catch (error) {
      console.error("Error starting voting session:", error);
      alert("Failed to start voting session.");
      setIsLoading(false);
    }
  };

  const approveVoter = async (voterAddress) => {
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const voting = new ethers.Contract(selectedVoting, Voting.abi, signer);
      const tx = await voting.approveVoter(voterAddress);
      setIsLoading(true)
      tx.wait()
      setIsLoading(true);

      alert("Voter approved successfully.");
      checkApprovalStatus(selectedVoting);
      setIsLoading(false);
    } catch (error) {
      console.error("Error approving voter:", error);
      alert("Failed to approve voter.");
      setIsLoading(false);
    }
  };

  return (
    <VotingContext.Provider
      value={{
        name,
        setName,
        cin,
        setCin,
        region,
        setRegion,
        votings,
        selectedVoting,
        candidates,
        isLoading,
        isRegistered,
        isApproved,
        currentAccount,
        voters,
        voterImageLink,
        winningCandidate,
        setImageLink,
        CinLink,
        setCINLink,
        isAdmin,
        selectVoting,
        registerVoter,
        vote,
        votingEndTime,
        createVotingSession,
        startVotingSession,
        approveVoter,
        setSelectedVoting,
        loadVoters,
        loadCandidates,
        uploadToPinata,
        setIsLoading,
       getVotingEndTime,
        setVotingEndTime,
        hasVoted,
        checkVoterVoteStatus,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
