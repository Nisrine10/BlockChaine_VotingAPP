import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useVotingContext} from "../context/VotingContext";

import FormField from "../components/ui/FormField";
import Loader from "../components/ui/Loader";
import CustomButton from "../components/ui/CustomButton";

const CreateVoting = () => {
  const navigate = useNavigate();
  const {createVotingSession, isLoading, setIsLoading} = useVotingContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({...form, [fieldName]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await createVotingSession({
      ...form,
    });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create Voting Session
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Voting Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Description *"
          placeholder="Write your description"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new voting session"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateVoting;
