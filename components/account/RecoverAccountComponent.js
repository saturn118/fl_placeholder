import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

const RecoverAccountComponent = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: ""
    },

    onSubmit: async values => {
      //   console.log("logging in request");
      //   console.log(values);
      //   const res = await fetch(
      //     DATA_SERVER_ADDRESS +
      //       `account/login/` +
      //       values.username +
      //       "&" +
      //       values.password
      //   );
      //   const loginResult = await res.json();
      //   console.log(loginResult);
      //   localStorage.setItem("token", loginResult.token);
      //   localStorage.setItem("account_id", loginResult.id);
      //   localStorage.setItem("account_username", loginResult.username);
      //   localStorage.setItem("account_type", loginResult.type);
      //   router.push("/"); //redirect to the main page
      //   router.reload();
    }
  });

  return (
    <div>
      <h2>RECOVER ACCOUNT SECTION</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          type="text"
          placeholder="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <button className="btn" type="submit">
          Recover Account
        </button>
      </form>
    </div>
  );
};

export default RecoverAccountComponent;
