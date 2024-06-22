import React from "react";
import {useVotingContext} from "../../context/VotingContext";
import FormField from "../ui/FormField";
import CustomButton from "../ui/CustomButton";

const RegisterVoter = () => {
  const {
    name,
    setName,
    cin,
    setCin,
    region,
    setRegion,
    setImageLink,
    setCINLink,
    registerVoter,
    isLoading,
  } = useVotingContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLink(file);
    }
  };

  const handleCINChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCINLink(file);
    }
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <h2 className="card-title">Register to Vote</h2>
        <FormField
          labelName="Enter your name"
          placeholder="Enter your name"
          inputType="text"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <FormField
          labelName="Enter your CIN"
          placeholder="Enter your CIN"
          inputType="text"
          value={cin}
          handleChange={(e) => setCin(e.target.value)}
        />
        <FormField
          labelName="Enter your region"
          placeholder="Enter your region"
          inputType="text"
          value={region}
          handleChange={(e) => setRegion(e.target.value)}
        />
        <FormField
          labelName="Upload voter image"
          inputType="file"
          handleChange={handleImageChange}
        />
        <FormField
          labelName="Upload CIN link"
          inputType="file"
          handleChange={handleCINChange}
        />
        <br />
        <CustomButton
          handleClick={registerVoter}
          disabled={isLoading}
          title={isLoading ? "Registering..." : "Register"}
          styles="bg-[#8c6dfd]"
        />
      </div>
    </div>
  );
};

export default RegisterVoter;
