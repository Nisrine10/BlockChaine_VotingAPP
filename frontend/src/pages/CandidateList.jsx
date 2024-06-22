import React, {useEffect, useState} from "react";
import {useVotingContext} from "../context/VotingContext";
import VotingCard from "../components/ui/VotingCard";
import CandidateList from "../components/voter/CandidateList";
import { useNavigate } from "react-router-dom";
import RegisterVoter from "../components/voter/RegisterVoter";
import CustomButton from "../components/ui/CustomButton";
import Confetti from "react-confetti";



// Modal Component
const Modal = ({isShowing, hide, children}) =>
  isShowing ? (
    <React.Fragment>
      <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
      <div className="modal-wrapper  fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="modal bg-white rounded-[10px] shadow-lg w-1/2 p-6 border-[2rem] border-grey">
          <div className="modal-header flex justify-end">
            <button type="button" className="text-black text-lg" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </React.Fragment>
  ) : null;

// useModal Hook
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

const SelectCandidates = () => {
  const {
    candidates,
    currentAccount,
    isRegistered,
    isApproved,
    winningCandidate,
  } = useVotingContext();
  const {isShowing, toggle} = useModal();

    const navigate = useNavigate();

    const handleCandidateClick = (candidate,index) => {
      const candidateValue = parseInt(candidate[3], 10);

      const candidateParams = new URLSearchParams({
        index:index,
        name: candidate[0],
        description: candidate[1],
        image: candidate[2],
        value: candidateValue,
      });

      navigate(`/candidate-details?${candidateParams.toString()}`);
    };

  const [candidatesI, setCandidates] = useState(candidates);
       useEffect(() => {
         setCandidates(candidatesI);
       }, [candidates]);

  return (
    <>
      <div className="flex justify-between mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white font-epilogue"
        >
          ← Back
        </button>
        {currentAccount && !isRegistered && !isApproved && (
          <>
            <Modal isShowing={isShowing} hide={toggle}>
              <RegisterVoter />
            </Modal>
            <CustomButton
              handleClick={toggle}
              title="Register to Vote"
              styles="bg-[#8c6dfd]"
            />
          </>
        )}
      </div>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          {winningCandidate}
        </h1>
        {/* <Confetti width={1200} height={1200} /> */}
        <div className="flex flex-wrap mt-[20px] gap-[36px] justify-center">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md w-full sm:w-[400px] cursor-pointer"
              onClick={() => handleCandidateClick(candidate, index)}
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  height={150}
                  className="w-full"
                  src={candidate[2]}
                  alt="Candidate"
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between">
                    <div className="font-bold text-xl mb-2">
                      {candidate[0]} {winningCandidate[0]}
                    </div>
                    <div className="font-bold text-xl mb-2">
                      {candidate[3].toNumber()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {currentAccount && isRegistered && (
            <>
              <button className="btn btn-primary" onClick={toggle}>
                Waitting for response
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};



export default SelectCandidates;
