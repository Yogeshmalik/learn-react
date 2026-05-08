import React from "react";
import { Link, useRouteError } from "react-router";
import Button from "./Button";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("This is router error: ", error.status);
  return (
    <div className="error-page min-h-screen flex flex-col m-auto justify-center items-center space-y-4 text-center">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/024/800/866/small/oops-comic-blast-with-white-and-green-colors-cloud-explosion-bubbles-for-cartoons-comic-burst-with-colorful-clouds-and-smash-free-png.png"
        alt="error img"
        className="flex max-w-52 bg-transparent w-full h-full object-contain"
      />
      <h1 className="error-oops text-3xl font-semibold text-red-600 flex flex-wrap">
        Oopss!! Something Went Wrong!!
      </h1>
      <h2 className="error-status text-xl font-semibold text-red-600">
        Status: Error {error.status} {error.statusText}
      </h2>
      <h2 className="error-data text-xl font-semibold text-orange-600">
        {error.data}{" "}
      </h2>
      <Link to="/">
        <Button
          size="large"
          color="green"
          label="Back to home"
          className="error-back-to-home border-2"
          src='https://img.icons8.com/?size=100&id=2tuQdCmArB2K&format=png&color=40C057'
        />
      </Link>
    </div>
  );
};

export default ErrorPage;
