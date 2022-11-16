import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";

const category = [
  "All",
  "Music",
  "Visual Arts",
  "Performing Arts",
  "Film",
  "Lectures & Books",
  "Fashion",
  "Nightlife",
];

const Home = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let [products, setProducts] = useState([]);
  let [toggleReload, setToggleReload] = useState(false);
  let [loading, setLoading] = useState(false);
  const [values, setvalue] = useState(category[0]);
  const tolowerCase = values.toLowerCase();

  console.log(products, "products=");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/products`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response: ", response.data.data);

          setProducts(response.data.data.reverse());
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api call: ", e);
      }
    };
    getAllProducts();
  }, [toggleReload]);
  console.log(products, "products++");

  return (
    <div className="eventMain">
      <div className="main">
        <select
          name="select1"
          id="select1"
          value={values}
          onChange={(e) => setvalue(e.target.value)}
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
      {products
        .filter((items) => values === items.select || values === "All")
        .map((item) => {
          console.log(item, "item");
          return (
            <div className="eventsMainDiv">
              <div className="titalMainDiv">
                <div className="titleDiv">
                  {" "}
                  <h1 className="titles">
                    <i>{item.title}</i>
                  </h1>
                </div>
                <div className="titleDiv">
                  <h4 className="select">{item.select}</h4>
                </div>
              </div>
              <div className="titleDiv">
                <h3>Description: </h3>
                <p className="dec">{item.description}</p>
              </div>
              <div className="addDiv">
                <h3>Address: </h3>
                <p className="add">{item.address}</p>
              </div>
              <div className="btnDivMain">
                <div className="dateMain">
                  <div className="dateDiv">
                    <h3>StartDate</h3>
                    <h4>{item.StartDate}</h4>
                  </div>
                  <div className="endDiv">
                    <h3>EndDate</h3>
                    <h4>{item.EndDate}</h4>
                  </div>
                </div>

                <div className="btnDiv">
                  {item.createdBy == state?.user?._id ? (
                    <>
                      <button
                        className="productDelete"
                        onClick={async () => {
                          try {
                            setLoading(true);

                            let deleted = await axios.delete(
                              `${state.baseUrl}/event/${item?._id}`,
                              {
                                withCredentials: true,
                              }
                            );
                            console.log("deleted: ", deleted.data);
                            setLoading(false);

                            setToggleReload(!toggleReload);
                          } catch (e) {
                            console.log("Error in api call: ", e);
                            setLoading(false);
                          }
                        }}
                      >
                        DeleteEvents
                      </button>

                      <Link to="/CreateEvent" state={{ event: item }}>
                        <button className="productEdit" onClick={() => {}}>
                          EditEvents
                        </button>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
