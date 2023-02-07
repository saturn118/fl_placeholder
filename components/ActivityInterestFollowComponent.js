import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetLoggedInAccountId } from "../config";
import { UpdateActivityInterestAction } from "../helpers/api";

export default function ActivityInterestFollowComponent({
  accountUsername = null,
  interestData = null,
  activityId = null
}) {
  const router = useRouter();
  const [data, setData] = useState(interestData);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    // initialValues: {
    //   instructor: false,
    //   student: false,
    //   promoter: false,
    //   spectator: false,
    //   gym: false,
    //   store: false
    // },
    onSubmit: async values => {
      console.log("Updating Activity Interest Values - Local");
      console.log(values);

      let accountId = GetLoggedInAccountId();
      UpdateActivityInterestAction(
        activityId,
        accountId,
        values.student,
        values.instructor,
        values.spectator
      ).then(data => {
        console.log("Updated Activity Interst - Response");
        console.log(data);
      });
    }
  });

  useEffect(() => {
    console.log("Refresh form ik");
    console.log(interestData);

    formik.setValues({ instructor: true });
    formik.resetForm();
  }, [interestData]);

  return (
    <form className="form-control" onSubmit={formik.handleSubmit}>
      <label className="label cursor-pointer">
        <span className="label-text">instructor</span>
        <input
          type="checkbox"
          id="instructor"
          name="instructor"
          value={formik.values.instructor}
          onChange={formik.handleChange}
          className="checkbox"
        />
      </label>
      {/* <label className="label cursor-pointer">
        <span className="label-text">Practitioner</span>
        <input
          id="student"
          type="checkbox"
          value={formik.values.student}
          onChange={formik.handleChange}
          className="checkbox"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Promoter</span>
        <input
          type="checkbox"
          value={formik.values.promoter}
          onChange={formik.handleChange}
          className="checkbox"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Spectator</span>
        <input
          type="checkbox"
          value={formik.values.spectator}
          onChange={formik.handleChange}
          className="checkbox"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Gym / Club / Dojo</span>
        <input
          type="checkbox"
          value={formik.values.gym}
          onChange={formik.handleChange}
          className="checkbox"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Store</span>
        <input
          type="checkbox"
          value={formik.values.store}
          className="checkbox"
        />
      </label> */}
      <button className="btn" type="submit">
        Update
      </button>
    </form>
  );
}
