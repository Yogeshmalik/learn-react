import React, { lazy } from "react";
// import Profile from "../components/Profile";
// import ProfileClass from "../components/ProfileClass";
import Shimmer from "../components/Shimmer";
const Profile = lazy(() => import("../components/Profile"));
const ProfileClass = lazy(() => import("../components/ProfileClass"));

const About = () => {
  return (
    <div className="about-page flex flex-col p-2 my-2 overflow-auto max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-semibold text-center">About Page</h1>
      <h3 className="text-lg font-semibold text-center">
        This is About Page showing Functional and Class based components
      </h3>
      <div className="profile-components flex md:flex-row flex-col mt-4 p-2 gap-4 rounded-md justify-between mx-auto">
        <Profile name="Yogesh" />
        <ProfileClass name="Yogesh" />
      </div>
    </div>
  );
};

export default About;
