import { TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { COMPANY_NAME, BACKGROUND_ATTR } from "../../config";
import { LoginAction } from "../../helpers/api";
import HeadingComponent from "../utility/HeadingComponent";
import SummaryStatComponent from "../utility/SummaryStatComponent";

const LoginPageComponent = ({ statsData }) => {
  const router = useRouter();
  const [loginErrorResponse, setLoginErrorResponse] = useState(null);

  let statElements = statsData
    ? statsData.stats.map(entry => {
        return (
          <div className="w-4/12 pt-5 pb-5">
            <SummaryStatComponent label={entry[0]} mainLabel={entry[1]} />
          </div>
        );
      })
    : null;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: ""
    },

    onSubmit: async values => {
      console.log("logging in request");
      console.log(values);

      LoginAction(values.username, values.password).then(data => {
        console.log(data);
        if (data.loggedIn) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("account_id", data.id);
          localStorage.setItem("account_username", data.username);
          localStorage.setItem("account_type", data.type);
          localStorage.setItem("linked_fighter_id", data.linkedFighterId);
          localStorage.setItem("polling_timestamp", 0);
          window.location.reload();
          // router.reload();
          // router.push(RestoreCachedUrl()); //redirect to the main page
        }
        setLoginErrorResponse(data.error);
      });
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

  let loginSectionElement = (
    <form className="space-y-3 w-full" onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          className={"w-full " + BACKGROUND_ATTR}
          variant="outlined"
          id="username"
          type="text"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <TextField
          className={"w-full " + BACKGROUND_ATTR}
          id="password"
          type="password"
          placeholder="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>

      <button className="btn customAccentBackground w-full" type="submit">
        Login
      </button>

      <p className="text-red-500 font-bold">{loginErrorResponse}</p>

      <li>
        <Link href="/account/register">
          <button className="btn w-full">Create Account</button>
        </Link>
      </li>
      <li>
        <Link href="/account/recover">
          <button className="customAccentText link text-center w-full">
            Forgot password
          </button>
        </Link>
      </li>
    </form>
  );

  if (statsData == null) {
    return loginSectionElement;
  }

  return (
    <div className="flex w-full">
      <div className="w-6/12">{loginSectionElement}</div>
      <div>
        <HeadingComponent size={4}>
          {" "}
          Benefits of your <span className="customAccentText">Free</span>{" "}
          {COMPANY_NAME} account
        </HeadingComponent>
        Personalized Recommendations Discover shows you'll love. Your Watchlist
        Track everything you want to watch and receive e-mail when movies open
        in theaters.
        <HeadingComponent size={4}>Your Reviews</HeadingComponent>
        Rate and remember everything you've seen. Contribute to {
          COMPANY_NAME
        }{" "}
        Add data that will be seen by millions of people and get cool badges.
        <li>Write Reviews</li>
        <li>Write RATINGS / DECISIONS</li>
        <li>Write RATINGS / DECISIONS</li>
        <li>
          N Martial Arts, Y Events, Z Promoters, X Fighters, N Techniques, Z
          Users
        </li>
        <div className="flexwrap">{statElements}</div>
      </div>
    </div>
  );
};

export default LoginPageComponent;
