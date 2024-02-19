import React, { useEffect, useState } from "react";
import all_logo from "../Images/all-logo.png";
import hand_shake from "../Images/hand-shake.png";
import { checkUser } from "../Data/data";
import Post from "../Api/Post";
import { useNavigate } from "react-router-dom";
import classes from "../Css/Intro.module.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Intro = () => {
  //to go on other page
  const navigate = useNavigate();

  //to load on start
  useEffect(() => {
    checkColor();
    if (
      !localStorage.getItem("ani") ||
      localStorage.getItem("ani") === "null" ||
      localStorage.getItem("ani") === undefined
    ) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      // console.log("inside if",localStorage.getItem("ani"));
      // // eslint-disable-next-line
    } else {
      console.log("ani", localStorage.getItem("ani"));
      checkAni(localStorage.getItem("ani"));
      console.log("ani found", localStorage.getItem("ani"));
    }
  }, []);

  // // eslint-disable-next-line

  //Hook to store color
  const [color, setColor] = useState("");

  //Method to Get Color according to serviceId
  const checkColor = () => {
    let serviceId = localStorage.getItem("serviceId");

    if (serviceId === "11") {
      setColor("#FFCC00");
    } else if (serviceId === "1") {
      setColor("#5ec3e7");
    } else {
      setColor("#5ec3e7");
    }
  };

  const checkAni = (ani) => {
    let requst = { ani: ani };
    let prmoise = Post(checkUser, requst);
    prmoise.then((e) => {
      console.log("e ", e);
      handlingResponse(e);
    });
  };

  const handlingResponse = (e) => {
    if (e === 0) {
      //not subscriber
      toast.error("Not subscriber please subscribe first");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    } else if (e === 2) {
      //billing pending
      toast.error("Billing Pending");
      console.log("billing pending");
      return;
    } else if (e === 1) {
      //give access to portal
      navigate("/home");
    } else if (e === "Network Error") {
      //Backend Not Working - so sending to error page
      navigate("/error");
    } else {
      toast.error("Please subscribe first");
      console.log("not sub");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.intro_screen}>
          <div className={classes.intro_logo}>
            <img alt="logo" src={all_logo} />
          </div>
          <div className={classes.intro_content}>
            <p>Welcome to </p>
            <h1>YoGames360</h1>
            <p>
              Play and Win Prizes for<br></br> Reaching Higher Levels.
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Intro;
