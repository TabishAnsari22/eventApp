import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from "axios";
import { GlobalContext } from "./Context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OptCode = () => {
  const [OTP, setOTP] = useState("");
  let { state, dispatch } = useContext(GlobalContext);
  const { state: email } = useLocation();
  const navigate = useNavigate();

  const hendler = async () => {
    console.log(email.email, "email.email");
    try {
      let response = await axios.post(`${state.baseUrl}/verifyOTP`, {
        email: email.email,
        otp: OTP,
      });
      navigate('/login')
      console.log("response", response.data.message);
    } catch (e) {
      console.log("Error in api", e);
    }
  
  };
  return (
    <div className="optMain">
      <h1 className="headingOpt">Confirmation Code</h1>
      <div className="otpInner">
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
          secure
        />
       <div className="optBtn"> <button className="btnOpt" onClick={hendler}>Confirm</button></div>

        {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
      </div>
    </div>
  );
};

export default OptCode;
