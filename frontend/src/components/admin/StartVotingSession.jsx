import React, {useState} from "react";
import {useVotingContext} from "../../context/VotingContext";
import FormField from "../ui/FormField";

const StartVotingSession = () => {
  const [votingDuration, setVotingDuration] = useState("");
  const {startVotingSession, isLoading} = useVotingContext();

  const handleDurationChange = (e) => {
    setVotingDuration(e.target.value);
  };

  return (
    <div className="card my-3">
      <div className="bg-[#1c1c24] w-full rounded-[20px] p-6">
        <h2 className="font-epilogue font-semibold text-[18px] text-white text-left">
          Start Voting Session
        </h2>
        <div className="form-group">
          <FormField
            labelName="Voting Duration (seconds)"
            placeholder="Enter voting duration in seconds"
            inputType="number"
            value={votingDuration}
            handleChange={handleDurationChange}
            color="white"
          />
        </div>
        <button
          onClick={() => startVotingSession(votingDuration)}
          disabled={isLoading}
          className="font-epilogue font-semibold text-[16px] bg-purple leading-[26px] bg-[#1dc071] mt-3 ml-10  text-white min-h-[52px] px-4 rounded-[10px]"
        >
          {isLoading ? "Starting..." : "Start Voting Session"}
        </button>
      </div>
    </div>
  );
};

export default StartVotingSession;
