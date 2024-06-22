import {
  createCampaign,
  dashboard,
  logout,
 
  profile,
 
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/home",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/candidates",
  },

  {
    name: "logout",
    imgUrl: logout,
  },
];

export const navlink = [
  {
    name: "Timing",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Voters",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
 

  {
    name: "Add Candidates",
    imgUrl: profile,
    link: "/profile",
  },
 ];

