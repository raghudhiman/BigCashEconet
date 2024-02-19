import React, { useEffect, useRef, useState } from "react";
import classes from "../Css/Otp.module.css";
import footer_logo from "../Images/logomain.png";
import { Navigate, useNavigate } from "react-router-dom";
import { matchOtp } from "../Data/data";
import Post from "../Api/Post";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Components/Loading";
import OtpInput from "react-otp-input";

const Otp = () => {
  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (otp.length == 4) {
  //     const ani = localStorage.getItem("ani");
  //     const pack = localStorage.getItem("pack");

  //     hitOnBackEnd(ani, otp);
  //   }
  // }, [otp]);

  useEffect(() => {
    // if (
    //   !localStorage.getItem("ani") ||
    //   localStorage.getItem("ani") === "null" ||
    //   localStorage.getItem("ani") === undefined
    // ) {
    //   navigate("/login");
    // }

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/login");
    }
  }, [timer]);

  const hitOnBackEnd = (ani, enteredOTP) => {
    let request = { ani: ani, otp: enteredOTP };

    console.log(request, "request");
    setLoading(true);
    let promise = Post(matchOtp, request);
    promise.then((e) => {
      console.log("e ", e);
      handlingResponse(e);
    });
  };

  const handlingResponse = (e) => {
    if (e === 0) {
      setLoading(false);
      setOTP("");
      toast.error("Wrong Otp");
      return;
    } else if (e === 1) {
      setTimeout(() => {
        setLoading(false);
        setOTP("");
        navigate("/home");
      }, 3000);
    } else if (e === 2) {
      setOTP("");
      toast.error("otp Expired");
      setTimeout(() => {
        setLoading(false);
        setOTP("");
        navigate("/subscription");
      }, 3000);
      return;
    } else {
      setLoading(false);
      setOTP("");
      toast.error("Wrong Otp");
      return;
    }
  };

  const handleButtonClick=()=>{
    const ani = localStorage.getItem("ani");
      const pack = localStorage.getItem("pack");
      if(otp.length==4){
        hitOnBackEnd(ani, otp);
      }
      else{
        toast.error("Enter the 4 digit otp number!");
      }
  }

  return (
    <div className={classes.container}>
      <div className={`${classes.success} ${classes.verification}`}>
        <div className={classes.contect_num}>
          <h2>OTP Verification</h2>
          <p>
            We have sent the send one time
            <br /> pin to <b>{localStorage.getItem("ani")}</b> via SMS.
          </p>
        </div>
        <div className={classes.success_logo}>
          <OtpInput
            value={otp}
            onChange={setOTP}
            numInputs={4}
            renderSeparator={<span className={classes.gap}></span>}
            renderInput={(props) => (
              <input {...props} className={classes.input_box} />
            )}
          />
        </div>

        <div className={classes.success_content}>
          <p>Time remaining: {timer} seconds</p>
          <button type="button" onClick={()=>handleButtonClick()}> Continue</button>
          <p>
            LOST PIN? <br />
            HAVE’NT RECEIVED PIN YET? <br />
            PIN EXPIRED? <br />
            <b>RETRY HERE</b>
          </p>
        </div>

        <div className={classes.footer_container}>
          <img src={footer_logo} alt="econet" className={classes.footer_logo} />
        </div>
      </div>

      {loading && <Loading />}
      <Toaster />
    </div>
  );
};

export default Otp;
