import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "./Context";
import axios from "axios";

import { styled } from "@mui/material/styles";

const NavBar = () => {
  let { state, dispatch } = useContext(GlobalContext);

  const logouthandler = async () => {
    try {
      let response = await axios.post(
        `${state.baseUrl}/logout`,
        {},

        {
          withCredentials: true,
        }
      );
      console.log("response", response.data);

      dispatch({ type: "USER_LOGOUT" });
    } catch (e) {
      console.log("Error in api", e);
    }
  };
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
  }));

  return (
    <>
      <nav className="nav_2">
        <div><h1 className="navHead"><i>Amazing Event</i></h1></div>
        {state?.isLogin === true ? (
          <div className="iconMain">
            <Link to="/CreateEvent">
              <button className="navBtn">CreateEvent</button>
            </Link>
            <Link to="/Home">
              <button className="navBtn">Home</button>
            </Link>
            <Link to="/MyEvent">
              <button className="navBtn">MyEvent</button>
            </Link>

            <Link to="/" onClick={logouthandler}>
              <button className="navBtn">Logout</button>
            </Link>
          </div>
        ) : null}

        {state?.isLogin === false ? (
          <div className="iconMain">
          <Link to="/">
              <button className="navBtn">Home</button>
            </Link>
            <Link to="/login">
              {" "}
              <button className="navBtn"> Login</button>
            </Link>
            <Link to="/signup">
              <button className="navBtn">Signup</button>
            </Link>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default NavBar;
