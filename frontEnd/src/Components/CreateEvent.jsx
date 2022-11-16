import React, { useContext, useState } from "react";
import { GlobalContext } from "./Context";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";

const CreateEvent = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let [toggleReload, setToggleReload] = useState(false);
  let [editEvents, setEditEvents] = useState(null);
  let [loading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = React.useState("sm");

  const router = useLocation();
  const event = router?.state;

  const formik = useFormik({
    initialValues: {
      title: event?.event?.title ?? "",
      select: event?.event?.select ?? "",
      description: event?.event?.description ?? "",
      address: event?.event?.address ?? "",
      StartDate: event?.event?.StartDate ?? "",
      EndDate: event?.event?.EndDate ?? "",
      createdBy: event?.event?.createdBy ?? "",
    },
    validationSchema: yup.object({
      title: yup.string("Enter your title"),
      select: yup.string("Enter your category"),
      description: yup.string("Enter your description"),
      address: yup.string("Enter your address"),
      StartDate: yup.string("Enter your startDate"),
      EndDate: yup.string("Enter your EndDate"),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log(values, "Values");
      if (event === null) {
        const data = new FormData();

        console.log(values, "hahah");
        axios({
          method: "post",
          url: `${state.baseUrl}/event`,
          data: {
            title: values["title"],
            select: values["select"],
            description: values["description"],
            address: values["address"],
            StartDate: values["StartDate"],
            EndDate: values["EndDate"],
          },

          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
          .then((res) => {
            console.log(`upload Success` + res.data);

            setToggleRefresh(!toggleRefresh);
            resetForm();
          })
          .catch((err) => {
            console.log("ERROR", err);
          });
      } else {
        try {
          let updated = await axios.put(
            `${state.baseUrl}/event/${event?.event._id}`,
            {
              title: values?.title,
              select: values?.select,
              description: values?.description,
              address: values?.address,
              StartDate: values?.StartDate,
              EndDate: values?.EndDate,
            },
            {
              withCredentials: true,
            }
          );
          console.log("updated: ", updated.data);

          setToggleReload(!toggleReload);
          setEditEvents(null);
          resetForm();
        } catch (e) {
          console.log("Error in api call: ", e);
          setLoading(false);
          setToggleRefresh(!toggleRefresh);
        }
      }
    },
  });
  return (
    <div className="eventMain">
      <h1 className="eventHeading">
        <b>
          <i>Create Event</i>
        </b>
      </h1>
      <div className="formMain">
        <form className="productForm" onSubmit={formik.handleSubmit}>
          <div>
            <input
              id="title"
              name="title"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <div className="errorMessage">{formik.errors.title}</div>
          ) : null}

          <div>
            <input
              id="address"
              name="address"
              placeholder="Address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.address && formik.errors.address ? (
            <div className="errorMessage">{formik.errors.address}</div>
          ) : null}

          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              type="textarea"
              rows="4"
              cols="25"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className="errorMessage">{formik.errors.description}</div>
          ) : null}

          <div>
            <select
              id="select"
              name="select"
              placeholder="select"
              type="select"
              value={formik.values.select}
              onChange={formik.handleChange}
            >
              <option value={"All"}>All</option>
              <option value={"Music"}>Music</option>
              <option value={"Visual Arts"}>Visual Arts</option>
              <option value={"Performing Arts"}>Performing Arts</option>
              <option value={"Film"}>Film</option>
              <option value={"Lectures & Books"}>Lectures & Books</option>
              <option value={"Fashion"}>Fashion</option>
              <option value={"Nightlife"}>Nightlife</option>
            </select>
          </div>
          {formik.touched.select && formik.errors.select ? (
            <div className="errorMessage">{formik.errors.select}</div>
          ) : null}
          <div className="eventDate">
            <div className="date">
              <label htmlFor="StartData">StartData</label>
              <input
                id="StartDate"
                name="StartDate"
                placeholder="StartDate"
                type="date"
                min={new Date()}
                value={formik.values.StartDate}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.StartDate && formik.errors.StartDate ? (
              <div className="errorMessage">{formik.errors.StartDate}</div>
            ) : null}

            <div className="date">
              <label htmlFor="EndDate">EndData</label>
              <input
                id="EndDate"
                name="EndDate"
                placeholder="EndDate"
                type="date"
                min={formik.values.StartDate}
                value={formik.values.EndDate}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.EndDate && formik.errors.EndDate ? (
              <div className="errorMessage">{formik.errors.EndDate}</div>
            ) : null}
          </div>

          <div>
            {" "}
            <button className="addProduct" type="submit">
              {event === null ? "Add Event" : "Update Event"}
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CreateEvent;
