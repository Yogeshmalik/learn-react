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
      <div className="profile-pages">
        <p className="class-heading">This is ProfileClass class component</p>
        <p className="class-heading">Name: {this.props.name}</p>
        <p className="class-heading">Count: {this.state.count}</p>
        <Button
          label="Count"
          onClick={() =>
            this.setState((prevState) => ({
              count: prevState.count + 1,
            }))
          }
        />
        <span className="github-data-block class-heading">
          <p className="class-heading">Github Info</p>
          <img
            src={this.state.userInfo.avatar_url}
            alt="git-avatar"
            className="git-avatar"
          />
          <p className="class-heading">Name: {this.state.userInfo.name}</p>
          <p className="class-heading">{this.state.userInfo.bio}</p>
        </span>
      </div>
    );
  }
}

export default ProfileClass;
