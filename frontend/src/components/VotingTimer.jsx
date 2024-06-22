import React, {useEffect, useState} from "react";
import {useVotingContext} from "../context/VotingContext";

const VotingTimer = () => {
  const {votingEndTime} = useVotingContext();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (votingEndTime) {
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const diff = votingEndTime - currentTime;
        if (diff > 0) {
          setTimeLeft(diff);
        } else {
          setTimeLeft(0);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [votingEndTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="card my-3">
      <div className="card-body">
      
        {votingEndTime ? (
          <p>{formatTime(timeLeft)}</p>
        ) : (
          <p>No active voting session</p>
        )}
      </div>
    </div>
  );
};

export default VotingTimer;
