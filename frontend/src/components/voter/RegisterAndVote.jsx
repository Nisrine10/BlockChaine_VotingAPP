import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLoginContext} from "../../context/LoginContext";
import {useVotingContext} from "../../context/VotingContext";
import SelectVotingSession from "./SelectVoting";
import RegisterVoter from "./RegisterVoter";
import CandidateList from "./CandidateList";
import VotingTimer from "../VotingTimer";


const RegisterAndVoteComponent = () => {
  const {currentAccount, isAdmin} = useLoginContext();
  const {isRegistered, isApproved} = useVotingContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentAccount) {
      navigate("/");
    } else if (isAdmin) {
      navigate("/admin");
    }
  }, [currentAccount, isAdmin, navigate]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Register and Vote</h1>
      <p>Account: {currentAccount}</p>
      {!isAdmin && (
        <>
          {!isApproved ? (
            <>
              {currentAccount && !isRegistered && <RegisterVoter />}
            </>
          ) : (
            <>
              <SelectVotingSession />
              <VotingTimer />
              <CandidateList />
            </>
          )}
        </>
      )}
    </div>
  );
};

const RegisterAndVote = () => {
  return <RegisterAndVoteComponent />;
};

export default RegisterAndVote;

