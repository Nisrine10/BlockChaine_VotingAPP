import React, { useEffect, useState } from "react";
import {useVotingContext} from "../../context/VotingContext";

const CandidateList = () => {
  const {candidates, vote, isLoading, isApproved} = useVotingContext();
    const [candidateI, setCandidate] = useState(candidates);

  useEffect(() => {
      console.log("Candidates updated:", candidates);
    setCandidate(candidates);
    
  }, [candidates,vote]); 

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left ">
        Candidates List
      </h1>
      {/* <Confetti width={1200} height={1200} /> */}
      <div className="flex flex-wrap mt-[20px] gap-[36px] justify-center bg-[#1c1c24] w-full rounded-[20px] p-6">
        {candidateI.map((candidate, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md w-full sm:w-[400px] cursor-pointer"
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
                  <div className="font-bold text-xl mb-2">{candidate[0]}</div>
                  <div className="font-bold text-xl mb-2">
                    {candidate[3].toNumber()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!candidateI && (
          <>
            <button className="font-epilogue font-semibold text-[18px] text-white text-left ">
              No Candidates
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
