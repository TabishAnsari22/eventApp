import "./App.css";
import Navbar from "./Components/NavBar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from "./Components/Context";
import axios from "axios";
import OtpCode from "./Components/OptCode"
import CreateEvent from "./Components/CreateEvent";
import Home from "./Components/Home";
import MyEvents from "./Components/MyEvents";



function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/profile`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response: ", response.data);
          dispatch({
            type: "USER_LOGIN",
            payload: response.data,
          });
        } else {
          dispatch({ type: "USER_LOGOUT" });
        }
      } catch (e) {
        console.log("Error in api", e);
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    getProfile();
  }, []);
console.log(state,"state");
  return (
    <Router>
      <Navbar />

      <Routes>
        {state?.isLogin === true ? (
          <>
             <Route path="/CreateEvent" element={<CreateEvent/> } />
            <Route path="/logout" element={<Signup/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/MyEvent" element={<MyEvents/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Home/>} />
           
            
          </>
        ) : null}

        {state?.isLogin === false ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/otp" element={<OtpCode/> } />
            <Route path="/" element={<Home/>} />
            {/* <Route path="/CreateEvent" element={<CreateEvent/> } /> */}
          </>
        ) : null}

        {state?.isLogin === null ? (
          <>
            <Route
              path="*"
              element={
                <div className="image_container234">
                  {/* <img src={lodingimg} alt="loding_image" /> */}
                </div>
              }
            />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
