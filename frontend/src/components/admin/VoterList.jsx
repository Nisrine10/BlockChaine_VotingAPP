import React from "react";
import {useVotingContext} from "../../context/VotingContext";

const VoterList = () => {
  const {voters, approveVoter, isLoading} = useVotingContext();

  if (!voters || voters.length === 0) {
    return (
      <p className="font-epilogue font-semibold text-[18px] text-white text-left">
        No voters found.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        Voters List
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[36px] justify-center bg-[#1c1c24] w-full rounded-[20px] p-6">
        {voters.map((voter, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md w-full sm:w-[400px] cursor-pointer"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="flex justify-between">
                  <div>
                    <img className="w-full h-[150px]" src={voter.cinImage} alt="CIN" />
                    <p className="font-bold text-xl mb-2">Name: {voter.name}</p>
                    <p className="font-bold text-xl mb-2">CIN: {voter.cin}</p>
                    <p className="font-bold text-xl mb-2">
                      Region: {voter.region}
                    </p>
                    <img className="w-full h-12" src={voter.image} alt="" />

                    <p className="font-bold text-xl mb-2">
                      Approved: {voter.isApproved ? "Yes" : "No"}
                    </p>
                  </div>
                  {!voter.isApproved && (
                    <button
                      onClick={() => approveVoter(voter.address)}
                      disabled={isLoading}
                      className="btn btn-success bg-green-500 text-white px-4 py-2 rounded"
                    >
                      {isLoading ? "Approving..." : "Approve"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {!voters.length && (
          <button className="font-epilogue font-semibold text-[18px] text-white text-left">
            No Voters
          </button>
        )}
      </div>
    </div>
  );
};

export default VoterList;
