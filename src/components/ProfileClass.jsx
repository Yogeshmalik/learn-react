import React from "react";
import Button from "./Button";

class ProfileClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      userInfo: [],
    };
    this.controller = new AbortController();
  }
  async componentDidMount() {
    const fetchGithub = await fetch(
      "https://api.github.com/users/Yogeshmalik",
      { signal: this.controller.signal },
    );
    const fetchGithubJson = await fetchGithub.json();
    // console.log("fetchGithuJson", fetchGithubJson);
    this.setState({
      userInfo: fetchGithubJson,
    });
  }

  componentWillUnmount() {
    // console.log("component did unmount");
    this.controller.abort();
  }

  render() {
    return (
      <div className="profile-pages text-green-700 flex flex-col items-center space-y-2">
        <p className="class-heading font-semibold text-lg">
          This is ProfileClass class component
        </p>
        <p className="class-heading font-semibold text-lg">
          Name: {this.props.name}
        </p>
        <p className="class-heading font-semibold text-lg">
          Count: {this.state.count}
        </p>
        <Button
          label="Count"
          color='green'
          onClick={() =>
            this.setState((prevState) => ({
              count: prevState.count + 1,
            }))
          }
        />
        <span className="github-data-block class-heading flex flex-col p-2 border-2 border-green-700 rounded-md text-center space-y-2">
          <p className="class-heading text-xl uppercase">Github Info</p>
          <img
            src={this.state.userInfo.avatar_url}
            alt="git-avatar"
            className="git-avatar max-w-24 w-full mx-auto rounded-full transition-all ease-in-out duration-300 hover:max-w-32 shadow outline-4 hover:shadow-green-500 hover:shadow-xl"
          />
          <p className="class-heading">Name: {this.state.userInfo.name}</p>
          <p className="class-heading">{this.state.userInfo.bio}</p>
        </span>
      </div>
    );
  }
}

export default ProfileClass;
