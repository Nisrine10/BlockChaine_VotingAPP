import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from "./components/Welcome";
import RegisterAndVote from "./components/voter/RegisterAndVote";
import AdminPanel from "./components/admin/AdminPanel";
import {LoginProvider} from "./context/LoginContext";
import {VotingProvider} from "./context/VotingContext";

import './index.css';
import Sidebar from "./components/ui/Sidebar";
import Navbar from "./components/ui/Navbar";
import { CampaignDetails, CreateCampaign, Home } from "./pages";
import SelectCandidates from "./pages/CandidateList";
import CandidateDetails from "./pages/CandidateDetails";


const App = () => {
  return (
    <Router>
      <div className="relative sm:-8 p-4 bg-[#242524df] min-h-screen flex flex-row  ">
        <div className="sm:flex hidden mr-10 relative">
          <LoginProvider>
            
            <Sidebar />
          </LoginProvider>
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <LoginProvider>
            <VotingProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/candidates" element={<SelectCandidates />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route
                  path="/candidate-details"
                  element={<CandidateDetails />}
                />
                <Route
                  path="/register-and-vote"
                  element={<RegisterAndVote />}
                />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </VotingProvider>
          </LoginProvider>
        </div>
      </div>
    </Router>
  );
};

export default App;

