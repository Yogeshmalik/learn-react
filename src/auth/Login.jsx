import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import { NavLink, useNavigate } from "react-router";
import * as Yup from "yup";
import Button from "../components/Button";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  // .required("First Name Required")
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  // .required("Last Name Required")
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Password Required"),
});

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page m-auto flex flex-col h-screen justify-center items-center space-y-4 md:space-y-8">
      <h1 className="signin-heading text-3xl uppercase font-semibold text-violet-500 text-center">
        Sign In to view restaurants
      </h1>
      <Formik
        className="formik"
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
          if (values.email === "a@b.co" && values.password === "12345678") {
            localStorage.setItem("isAuth", "true");
            navigate("/");
          } else {
            alert("Invalid Credentials");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="formik-form borde border-amber-500 rounded-md flex flex-col p-4 w-full max-w-xs md:max-w-96 shadow-lg hover:shadow-2xl shadow-amber-500 space-y-4 mx-auto">
            <label
              htmlFor="firstName"
              className="text-lg text-black font-semibold flex flex-col w-full"
            >
              First Name
              <Field
                name="firstName"
                id="firstName"
                placeholder="First Name"
                type="text"
                autoComplete="current-first-name"
                className="outline-0 shadow p-1.5 text-orange-500 placeholder:font-normal"
              />
              {errors.firstName && touched.firstName ? (
                <div className="form-error-tag text-red-500">
                  {errors.firstName}
                </div>
              ) : null}
            </label>

            <label
              htmlFor="lastName"
              className="text-lg text-black font-semibold flex flex-col"
            >
              Last Name
              <Field
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                type="text"
                autoComplete="current-last-name"
                className="outline-0 shadow p-1.5 text-orange-500 placeholder:font-normal"
              />
              {errors.lastName && touched.lastName ? (
                <div className="form-error-tag text-red-500">
                  {errors.lastName}
                </div>
              ) : null}
            </label>

            <label
              htmlFor="email"
              className="text-lg text-black font-semibold flex flex-col"
            >
              Email*
              <Field
                id="email"
                name="email"
                placeholder="a@b.co"
                type="email"
                autoComplete="current-email"
                className="outline-0 shadow p-1.5 text-orange-500 placeholder:font-normal"
              />
              {errors.email && touched.email ? (
                <div className="form-error-tag text-red-500">
                  {errors.email}
                </div>
              ) : null}
            </label>

            <label
              htmlFor="password"
              className="text-lg text-black font-semibold flex flex-col"
            >
              Password*
              <Field
                id="password"
                name="password"
                placeholder="12345678"
                type="password"
                autoComplete="current-password"
                className="outline-0 shadow p-1.5 text-orange-500 placeholder:font-normal"
              />
              {errors.password && touched.password ? (
                <div className="form-error-tag text-red-500">
                  {errors.password}
                </div>
              ) : null}
            </label>
            <Button type="submit" label="Submit" className="mx-auto" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
