import { useFormik } from "formik";
import React from "react";

export function UserEntityReview({ entityId = null, entityType = null }) {
  let MAX_CHARACTERS = 250;
  const formik = useFormik({
    initialValues: {
      review: ""
    },

    onSubmit: async values => {}
  });

  function ReviewElementGenerator() {
    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
          <p>
            {formik.values.review.length} / {MAX_CHARACTERS}
          </p>
          <li>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              id="review"
              type="text"
              placeholder="Leave an optional text review"
              value={formik.values.review}
              onChange={formik.handleChange}
            />
          </li>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Review Cotains Spoilers</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                // checked={false}
                onClick={() => {}}
              />
            </label>
          </div>
          <li>
            <button className="btn btn-wide">Submit/Update Review bb</button>
          </li>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <p>
          {formik.values.review.length} / {MAX_CHARACTERS}
        </p>
        <li>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            id="review"
            type="text"
            placeholder="Leave an optional text review"
            value={formik.values.review}
            onChange={formik.handleChange}
          />
        </li>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Review Cotains Spoilers</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              // checked={false}
              onClick={() => {}}
            />
          </label>
        </div>
        <li>
          <button className="btn btn-wide">Submit/Update Review cc</button>
        </li>
      </form>
    </div>
  );
}
