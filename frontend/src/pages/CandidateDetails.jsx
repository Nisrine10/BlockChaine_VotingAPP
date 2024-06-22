import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ethers} from "ethers";

import Loader from "../components/ui/Loader";
import CountBox from "../components/ui/CountBox";
import CustomButton from "../components/ui/CustomButton";
import { profile } from "../assets";
import { useVotingContext } from "../context/VotingContext";

const CandidateDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {state} = useLocation();
  const navigate = useNavigate();
const {
  isRegistered,
  isApproved,
  vote,
  hasVoted,
  getVotingEndTime,
  votingEndTime,
  selectedVoting,
} = useVotingContext();

  const [isLoading, setIsLoading] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  

  const candidate = {
    index: parseInt(searchParams.get("index")),
    name: searchParams.get("name"),
    description: searchParams.get("description"),
    image: searchParams.get("image"),
    value: parseInt(searchParams.get("value"), 10),
  };

 
useEffect(() => {
  // Fetch the voting end time and start the interval
  const fetchVotingEndTime = async () => {
    await getVotingEndTime(selectedVoting);
    updateRemainingTime();
  };

  fetchVotingEndTime();

  const interval = setInterval(() => {
    updateRemainingTime();
  }, 1000);

  // Clear interval on component unmount
  return () => clearInterval(interval);
}, [selectedVoting, votingEndTime, vote]);



 const updateRemainingTime = () => {
   const currentTime = Math.floor(Date.now() / 1000);
   const diff = votingEndTime - currentTime;
   setRemainingSeconds(diff > 0 ? diff : 0);
 };

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const remainingSeconds = seconds % 86400;
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const second = remainingSeconds % 60;

    // Build the time string
    let timeString = "";
    if (days > 0) {
      timeString += `${days}d `;
    }
    if (hours > 0) {
      timeString += `${hours}h `;
    }
    if (minutes > 0) {
      timeString += `${minutes}m `;
    }
    timeString += `${second}s`;

    return timeString;
  };
  const remainingDays = formatTime(remainingSeconds);
 

  return (
    <div>
      {isLoading && <Loader />}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-200 font-epilogue mb-5"
      >
        ← Back
      </button>

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={candidate.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2"></div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />

          <CountBox title="Total Voters" value={candidate.value} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={profile}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {candidate.name}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Description of the campaign
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {candidate.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Candidate {candidate.index}
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Vote For the Candidate
            </p>
            <div className="mt-[30px]">
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Vote it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the Candidate, just because it speaks to you.
                </p>
              </div>
              {hasVoted ? (
                <CustomButton
                  btnType="button"
                  handleClick={() => vote(candidate.index)}
                  disabled={isLoading || !isApproved}
                  title={
                    isLoading
                      ? "Voting..."
                      : !isRegistered
                      ? "Vote"
                      : !isApproved
                      ? "Waiting For Approval"
                      : "Vote"
                  }
                  styles={`w-full ${
                    isApproved ? "bg-[#8c6dfd]" : "bg-gray-400"
                  }`}
                />
              ) : (
                <CustomButton
                  btnType="button"
                  handleClick={() => vote(candidate.index)}
                  disabled="true"
                  title={"Already Voted"}
                  styles={`w-full ${
                    !isApproved ? "bg-[#8c6dfd]" : "bg-gray-400"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
