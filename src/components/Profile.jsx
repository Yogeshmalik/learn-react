import { useEffect, useState } from "react";
import Button from "./Button";

const Profile = ({ name }) => {
  const [count, setCount] = useState(0);
  const [fetchGithubData, setGithubDataFetch] = useState([]);

  useEffect(() => {
    githubApiFetch();
  }, []);

  const githubApiFetch = async () => {
    const githubData = await fetch("https://api.github.com/users/Yogeshmalik");
    const githubDataJson = await githubData.json();
    setGithubDataFetch(githubDataJson);
    console.log("githubDataJson useeffect", githubDataJson);
  };

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div className="profile-pages text-orange-500 flex flex-col items-center space-y-2">
      <p className="function-heading text-lg font-semibold">This is Profile Functional Componenent</p>
      <p className="function-heading text-lg font-semibold">Name: {name}</p>
      <p className="function-heading text-lg font-semibold">Count: {count}</p>
      <Button onClick={handleCount} label="Count" />
      <span className="github-data-block function-heading flex flex-col p-2 border-2 border-orange-500 rounded-md text-center space-y-2">
        <p className="function-heading text-xl uppercase">Github Info</p>
        <img
          src={fetchGithubData.avatar_url}
          alt="git-avatar"
          className="git-avatar max-w-24 w-full mx-auto rounded-full transition-all ease-in-out duration-300 hover:max-w-32 shadow outline-4 hover:shadow-orange-500 hover:shadow-xl"
        />
        <p className="function-heading">Name: {fetchGithubData.name}</p>
        <p className="function-heading">{fetchGithubData.bio}</p>
      </span>
    </div>
  );
};

export default Profile;
