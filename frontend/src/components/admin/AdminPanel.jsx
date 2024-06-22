import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useLoginContext} from "../../context/LoginContext";
import CreateVoting from "./CreateVoting";
import SelectVoting from "./SelectVoting";
import VoterList from "./VoterList";
import AddCandidate from "./AddCandidate";
import StartVotingSession from "./StartVotingSession";
import CandidateList from "./CandidateList";
import VotingTimer from "../VotingTimer";
import { useVotingContext } from "../../context/VotingContext";



const AdminPanelComponent = () => {
  const {currentAccount, isAdmin} = useLoginContext();
  const navigate = useNavigate();

  const {votings, selectedVoting, candidates, loadVoters, vote} =
    useVotingContext();


  if (!currentAccount) {
    navigate("/");
  }

  if (!isAdmin) {
    return <p>You do not have access to this page.</p>;
  }
 
   
  return (
    <div className="container my-5">
      <h1 className="font-epilogue font-semibold text-[48px] text-white text-center mb-4">
        Admin Panel
      </h1>
      {/* <CreateVoting /> */}
      <SelectVoting />
    </div>
  );
};

const AdminPanel = () => {
  return <AdminPanelComponent />;
};

export default AdminPanel;


