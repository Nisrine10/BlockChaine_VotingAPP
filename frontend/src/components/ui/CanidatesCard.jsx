import React from "react";
import {useNavigate} from "react-router-dom";

const VotingCard = ({voting, index, handleClick, timeLeft, address}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#1c1c24] rounded-[10px] p-4 w-[400px] cursor-pointer "
      onClick={handleClick}
    >
      <h3 className="font-epilogue font-bold text-[18px] text-white">
        Voting {index + 1}
      </h3>
      <p className="font-epilogue text-[14px] text-[#818183] mt-2">
        Address: {address}
      </p>
      <p className="font-epilogue text-[14px] text-[#818183] mt-2">
        Time Left: {timeLeft}
      </p>
    </div>
  );
};

export default VotingCard;
