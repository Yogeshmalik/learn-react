import React from "react";
import Profile from "../components/Profile";
import ProfileClass from "../components/ProfileClass";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Page</h1>
      <h3>This is About Page showing Functional and Class based components</h3>
      <div className="profile-components">
        <Profile name="Yogesh" />
        <ProfileClass name="Yogesh" />
      </div>
    </div>
  );
};

export default About;
