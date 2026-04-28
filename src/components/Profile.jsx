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
    <div className="profile-pages">
      <p className="function-heading">This is Profile Functional Componenent</p>
      <p className="function-heading">Name: {name}</p>
      <p className="function-heading">Count: {count}</p>
      <Button onClick={handleCount} label="Count" />
      <span className="github-data-block function-heading">
        <p className="function-heading">Github Info</p>
        <img
          src={fetchGithubData.avatar_url}
          alt="git-avatar"
          className="git-avatar"
        />
        <p className="function-heading">Name: {fetchGithubData.name}</p>
        <p className="function-heading">{fetchGithubData.bio}</p>
      </span>
    </div>
  );
};

export default Profile;
