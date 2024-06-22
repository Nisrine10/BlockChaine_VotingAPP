import React, {useEffect, useState} from "react";
import {useVotingContext} from "../context/VotingContext";
import VotingCard from "../components/ui/VotingCard";
import CandidateList from "../components/voter/CandidateList";
import { Navigate, useNavigate } from "react-router-dom";


const SelectVoting = () => {
  const {
    votings,
    setSelectedVoting,
    loadVoters,
    loadCandidates,
    getVotingEndTime,
    votingEndTime,
  } = useVotingContext();
    const navigate = useNavigate();

  const [selectedVotingId, setSelectedVotingId] = useState(null);

  const handleNavigate = (voting) => {
    setSelectedVoting(voting);
    setSelectedVotingId(voting);
    loadVoters(voting);
    loadCandidates(voting);
    navigate("/candidates")
  };

  

  const getTimeLeft = (votingEnd) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const diff = votingEnd - currentTime; // Use votingEnd instead of votingEndTime
    console.log(diff);
    return diff > 0 ? diff : 0;
  };


  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  console.log('====================================');
  console.log(votings);
  console.log('====================================');

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        Voting Sessions ({votings.length}) 
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[36px] justify-center">
        {votings.map((voting, index) => (
          <VotingCard
            key={voting.id}
            voting={voting}
            index={index}
            timeLeft={formatTime(getTimeLeft(voting))}
            address={voting}
            handleClick={() => handleNavigate(voting)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectVoting;
