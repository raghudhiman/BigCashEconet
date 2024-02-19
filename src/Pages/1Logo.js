import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import img_logo from "../Images/bigcash-logo.png";
import img_logo from "../Images/Group 91.png";
import classes from "../Css/Logo.module.css";

const Logo = () => {
  //to navigate on other page
  const navigate = useNavigate();

  //To Load on Start
  useEffect(() => {
    gettingRequestParams();
    setTimeout(() => {
      navigate("/intro");
    }, 1000);
    // eslint-disable-next-line
  }, []);

  //State to store color
  const [color, setColor] = useState("");

  //Getting Request Params
  const gettingRequestParams = () => {
    const params = new URLSearchParams(window.location.search);
    let ani = params.get("ani"); //i.e userId
    let serviceIdd = params.get("serviceId"); //i.e serviceId
    let msisdn = params.get("msisdn"); //i.e ani

    if (ani !== null && serviceIdd != null && msisdn !== null) {
      // console.log("Inside Not Null");
      localStorage.setItem("ani", msisdn);
      localStorage.setItem("serviceId", serviceIdd);
      localStorage.setItem("userId", ani);
    } else {
      localStorage.setItem("ani", msisdn);
      localStorage.setItem("serviceId", "1");
      // console.log("Inside Null");
    }

    let serviceId = localStorage.getItem("serviceId");
    if (serviceId === "11") {
      setColor("#FFCC00");
    } else if (serviceId === "1") {
      setColor("#5ec3e7");
    } else {
      setColor("#5ec3e7");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.center_logo}>
        <img alt="logo" src={img_logo} />
      </div>
    </div>
  );
};
export default Logo;
