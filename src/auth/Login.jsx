import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import { NavLink } from "react-router";
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

export const Login = () => (
  <div className="login-page">
    <h1 className="signin-heading">Sign In to view restaurants</h1>
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
          window.location.href = "/";
        } else {
          alert("Invalid Credentials");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="formik-form">
          <label htmlFor="firstName">First Name</label>
          <Field
            name="firstName"
            id="firstName"
            placeholder="First Name"
            type="text"
            autoComplete="current-first-name"
          />
          {errors.firstName && touched.firstName ? (
            <div className="form-error-tag">{errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <Field
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            type="text"
            autoComplete="current-last-name"
          />
          {errors.lastName && touched.lastName ? (
            <div className="form-error-tag">{errors.lastName}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="a@b.co"
            type="email"
            autoComplete="current-email"
          />
          {errors.email && touched.email ? (
            <div className="form-error-tag">{errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            placeholder="12345678"
            type="password"
            autoComplete="current-password"
          />
          {errors.password && touched.password ? (
            <div className="form-error-tag">{errors.password}</div>
          ) : null}
          <Button type="submit" label="Submit" />
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
