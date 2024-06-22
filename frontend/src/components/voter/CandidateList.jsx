import React from "react";
import {useVotingContext} from "../../context/VotingContext";
import {ethers} from "ethers"; // Assuming you're using ethers.js for handling BigNumber
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
const CandidateList = () => {
  const {candidates, vote, isLoading, isApproved} = useVotingContext();
  const navigate = useNavigate();

     const handleCandidateClick = (candidate) => {
       const candidateValue = ethers.BigNumber.isBigNumber(candidate[3])
         ? candidate[3].toNumber()
         : parseInt(candidate[3], 10);

       const candidateParams = new URLSearchParams({
         name: candidate[0],
         description: candidate[1],
         image: candidate[2],
         value: candidateValue,
       });

       navigate(`/candidate-details?${candidateParams.toString()}`);
     };


  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        Candidates
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[36px] justify-center">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md w-full sm:w-[400px]"
            onClick={() => handleCandidateClick(candidate)}
          >
         
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={candidate[2]} alt="Candidate" />
              <div className="px-6 py-4">
                <div className="flex justify-between">
                  <div className="font-bold text-xl mb-2">{candidate[0]}</div>
                  <div className="font-bold text-xl mb-2">
                    {ethers.BigNumber.isBigNumber(candidate[3])
                      ? candidate[3].toString()
                      : candidate[3]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
