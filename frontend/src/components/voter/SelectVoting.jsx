import React, {useState} from "react";
import {useVotingContext} from "../../context/VotingContext";

const SelectVoting = () => {
  const {votings, selectVoting, setSelectedVoting} = useVotingContext();
  const [selected, setSelected] = useState("");

  const handleSelect = (e) => {
    const votingAddress = e.target.value;
    setSelected(votingAddress);
    setSelectedVoting(votingAddress);
    selectVoting(votingAddress);
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <h2 className="card-title">Select Voting Session</h2>
        <select
          value={selected}
          onChange={handleSelect}
          className="form-control"
        >
          <option value="">Select a session</option>
          {votings.map((voting, index) => (
            <option key={index} value={voting}>
              Voting Session {index + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectVoting;
