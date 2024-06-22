import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {useParams} from "react-router-dom";
import Voting from "../../Voting.json";
import {useVotingContext} from "../../context/VotingContext"; // Import the context
import FormField from "../ui/FormField";

const AddCandidate = () => {
  const {selectedVoting} = useVotingContext();
  const [candidateName, setCandidateName] = useState("");
  const [candidateDescription, setCandidateDescription] = useState("");
  const [candidateImageLink, setCandidateImageLink] = useState("");
  const [currentVoting, setCurrentVoting] = useState(null);

  const {uploadToPinata} = useVotingContext(); // Destructure the function from context

  useEffect(() => {
    const loadVoting = async () => {
      if (!selectedVoting) {
        console.error("No contract address provided");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const voting = new ethers.Contract(selectedVoting, Voting.abi, signer);
        setCurrentVoting(voting);
      } catch (error) {
        console.error("Error loading contract:", error);
      }
    };

    loadVoting();
  }, [selectedVoting]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];

    try {
      const imageLink = await uploadToPinata(
        file,
        "File uploaded using Pinata"
      );
      setCandidateImageLink(imageLink);

      if (currentVoting) {
        await currentVoting.addCandidate(
          candidateName,
          candidateDescription,
          imageLink
        );
        alert("Candidate added successfully!");
      } else {
        console.error("Current voting contract is not loaded");
      }
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      alert("Failed to upload file to Pinata");
    }
  };

  return (
    <div>
      <div className="bg-[#1c1c24] w-full rounded-[20px] p-6">
        <h2 className="font-epilogue font-semibold text-[18px] text-white text-left">
          Add Candidate
        </h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-[20px]">
          <label
            htmlFor="file-upload"
            className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]"
          >
            Select File
          </label>
          <input
            id="file-upload"
            type="file"
            name="file"
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          />

          <FormField
            labelName="Name"
            placeholder="Enter candidate name"
            inputType="text"
            value={candidateName}
            handleChange={(e) => setCandidateName(e.target.value)}
            color="white"
          />
          <FormField
            labelName="Description"
            placeholder="Enter candidate description"
            inputType="text"
            value={candidateDescription}
            handleChange={(e) => setCandidateDescription(e.target.value)}
            color="white"
          />

          <button
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-[#3d433a] font-epilogue text-white text-[14px] rounded-[10px] sm:min-w-[300px]"
            type="submit"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
