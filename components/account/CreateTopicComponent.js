import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DATA_SERVER_ADDRESS } from "../../config";
import { CreateThreadAction, AddUserFeedPostAction } from "helpers/api";

const CreateTopicComponent = ({ entityId, entityType }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      spoilers: false
    },

    onSubmit: async values => {
      console.log("logging in request");
      console.log(values);

      AddUserFeedPostAction(
        values.content,
        false,
        null,
        null,
        true,
        entityType,
        entityId
      );
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="title"
          type="text"
          placeholder="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <input
          id="content"
          type="text"
          placeholder="content"
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        <span className="label-text">spoilers</span>
        <input
          type="checkbox"
          id="spoilers"
          name="spoilers"
          value={formik.values.spoilers}
          onChange={formik.handleChange}
          className="checkbox"
        />
        <button
          type="submit"
          className="btn clickupShadow w-full customAccentBackground text-white"
          onClick={() => {}}
        >
          CREATE TOPIC
        </button>
      </form>
    </div>
  );
};

export default CreateTopicComponent;
