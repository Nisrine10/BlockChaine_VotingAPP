import React from "react";
import {useVotingContext} from "../../context/VotingContext";

const CreateVoting = () => {
  const {createVotingSession, isLoading} = useVotingContext();

  return (
    <div className="card my-3">
      <div className="card-body">
        <h2 className="card-title">Create Voting Session</h2>
        <button
          onClick={createVotingSession}
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? "Creating..." : "Create Voting Session"}
        </button>
      </div>
    </div>
  );
};

export default CreateVoting;
