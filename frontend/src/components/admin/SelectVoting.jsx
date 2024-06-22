import React, { useEffect, useState } from "react";
import {useVotingContext} from "../../context/VotingContext";
import VotingCard from "../ui/VotingCard";
import VoterList from "./VoterList";
import AddCandidate from "./AddCandidate";
import StartVotingSession from "./StartVotingSession";
import VotingTimer from "../VotingTimer";
import CandidateList from "./CandidateList";

import { useNavigate } from "react-router-dom";

import { logo, sun, dashboard, createCampaign, profile } from "../../assets";
import { navlinks } from "../../constant";
import { useLoginContext } from "../../context/LoginContext";



const Icon = ({ styles, name, imgUrl, isActive, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center cursor-pointer ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt="icon"
      className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
    />
  </div>
);

const SelectVoting = () => {


  const {
    votings,
    selectedVoting,
    setSelectedVoting,
    loadVoters,
    loadCandidates,
  } = useVotingContext();



    const [show, ishow] = useState(false);

    const handleClick1 = (voting) => {
      setSelectedVoting(voting);
      loadVoters(voting);
      loadCandidates(voting);
      ishow1(!show1);
    };

    const navigate = useNavigate();
    const [isActive1, setIsActive1] = useState("campaign");
    const [show1, ishow1] = useState(false);
    
    const {disconnectWallet} = useLoginContext(); 

  
  const [isActive, setIsActive] = useState("Timing");

   const [votingI, setVotings] = useState(votings);

  useEffect(() => {
    setVotings(votings)
  }, [votings]); 


  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        Voting Sessions ({votingI.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[36px] justify-center">
        {votingI.map((voting, index) => (
          <VotingCard
            key={voting.id}
            voting={voting}
            index={index}
            address={voting}
            handleClick={() => handleClick1(voting)}
          />
        ))}
      </div>

      {show1 && (
        <>
          <div className="flex justify-between items-center flex-row sticky top-5 h-[1vh] m-10">
            <div className="flex-1 flex flex-row justify-between items-center bg-[#1c1c24] w-full rounded-[20px]  ">
              <div className="flex flex-row justify-center items-center gap-3">
                {navlink.map((link) => (
                  <Icon
                    key={link.name}
                    {...link}
                    isActive={isActive}
                    handleClick={() => setIsActive(link.name)}
                  />
                ))}
              </div>
            </div>
          </div>

          {isActive === "Timing" && (
            <>
              <StartVotingSession />
            </>
          )}
          {isActive === "Voters" && <VoterList />}
          {isActive === "Add Candidates" && (
            <>
              <AddCandidate />
              <CandidateList />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SelectVoting;

export const navlink = [
  {
    name: "Timing",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Voters",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "Add Candidates",
    imgUrl: profile,
    link: "/profile",
  },


];

         

