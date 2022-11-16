import React from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "./Context";
import { Link } from "react-router-dom";


const MyEvents = () => {
    let [loading, setLoading] = useState(false);
    let [toggleReload, setToggleReload] = useState(false);
    let { state, dispatch } = useContext(GlobalContext);
    let [products, setProducts] = useState([]);


    useEffect(() => {
        const getAllProducts = async () => {
          try {
            let response = await axios({
              url: `${state.baseUrl}/event/${state.user?._id}`,
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

      return (
          
      
          <div className="eventMain">
     {
         products.map((item)=>{
             console.log(item,"iddd1",item?.createdBy)
             
             console.log(item,"item");
             return <div className="eventsMainDiv">
                <div className="titalMainDiv">
                <div className="titleDiv" > <h1 className="titles"><i>{ item.title}</i></h1></div>
                <div className="titleDiv"><h4 className="select">{item.select}</h4></div>
                </div>
                <div className="titleDiv"><h3>Description: </h3><p className="dec">{item.description}</p></div>
                <div className="addDiv"><h3>Address: </h3><p className="add">{item.address}</p></div>
                <div className="btnDivMain">
              <div className="dateMain">
              <div className="dateDiv"><h3>StartDate</h3><h4>{item.StartDate}</h4></div>
                <div className="endDiv"><h3>EndDate</h3><h4>{item.EndDate}</h4></div>
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
        })
     }
    </div>
  )
}

export default MyEvents
