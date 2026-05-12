import React, { Suspense, useContext, useEffect, useState } from "react";
import Button from "./Button";
import Shimmer from "./Shimmer";
import UserContext from "../providers/UserContext";

const Profile = ({ name }) => {
  const [count, setCount] = useState(0);
  const [fetchGithubData, setGithubDataFetch] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    githubApiFetch();
  }, []);

  const githubApiFetch = async () => {
    setLoading(true);
    const githubData = await fetch("https://api.github.com/users/Yogeshmalik");
    const githubDataJson = await githubData.json();
    setGithubDataFetch(githubDataJson);
    setLoading(false);
    // console.log("githubDataJson useeffect", githubDataJson);
  };

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <Suspense fallback={<Shimmer />}>
      {loading ? (
        <Shimmer />
      ) : (
        <div className="profile-pages text-orange-500 bg-orange-50 border-2 border-orange-500 p-2 rounded-md flex flex-col items-center space-y-2 w-full">
          <p className="function-heading text-lg font-semibold">
            This is Profile Functional Componenent
          </p>
          <p className="function-heading text-lg font-semibold">Name: {name}</p>
          <p className="function-heading text-lg font-semibold">
            Name from UserContext: {loggedInUser}
          </p>
          <p className="function-heading text-lg font-semibold">
            Count: {count}
          </p>
          <Button onClick={handleCount} label="Count" />
          <span className="github-data-block function-heading flex flex-col text-center space-y-2">
            <p className="function-heading text-xl uppercase">Github Info</p>
            <img
              src={fetchGithubData.avatar_url}
              alt="git-avatar"
              className="git-avatar max-w-24 w-full mx-auto rounded-full transition-all ease-in-out duration-300 hover:scale-125 shadow outline-4 hover:shadow-orange-500 hover:shadow-xl"
            />
            <p className="function-heading">Name: {fetchGithubData.name}</p>

            <p className="function-heading">{fetchGithubData.bio}</p>
          </span>
        </div>
      )}
    </Suspense>
  );
};

export default Profile;
