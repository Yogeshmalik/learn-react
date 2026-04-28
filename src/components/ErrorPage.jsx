import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("This is router error: ", error.status);
  return (
    <div className="error-page">
      <h1 className="error-oops">Oopss!! Something Went Wrong!!</h1>
      <h2 className="error-status">
        Status: Error {error.status} {error.statusText}
      </h2>
      <h2 className="error-data">{error.data} </h2>
      <Link to="/">
        <button className="error-back-to-home">Back to home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
