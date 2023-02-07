import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_ADDRESS } from "../../config";

const RegisterComponent = () => {
  const router = useRouter();
  const [registerErrorResponse, setRegisterErrorResponse] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      passwordVerify: ""
    },

    onSubmit: async values => {
      console.log("logging in request");
      console.log(values);

      const res = await fetch(
        DATA_SERVER_ADDRESS +
          `account/create/` +
          values.username +
          "&" +
          values.password +
          "&" +
          values.email
      );
      const result = await res.json();
      console.log("Register Create request");
      console.log(result);

      if (result.created) {
        router.push("/account/login"); //redirect to the main page
      }
      setRegisterErrorResponse(result.error);
    }
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!!token && token !== "" && token !== "null") {
      console.log("TOKEN");
      console.log(token);
      router.push("/");
    }
  }, []);

  return (
    <div>
      <h2>REGISTER SECTION</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          id="passwordVerify"
          type="password"
          placeholder="password-verify"
          value={formik.values.passwordVerify}
          onChange={formik.handleChange}
        />
        <p>{registerErrorResponse}</p>
        <button className="btn" type="submit">
          Register Account
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
