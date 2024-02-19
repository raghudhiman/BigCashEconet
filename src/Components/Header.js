import React from "react";
import classes from "../Css/Header.module.css";
import img_logo from "../Images/Group 91.png";
import footer_logo from "../Images/logomain.png";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../Data/data";
import Post from "../Api/Post";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { MdPhoneAndroid } from "react-icons/md";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div class={`${classes.success} ${classes.verification}`}>
        <div className={classes.login_logo}>
          <img src={img_logo} />
        </div>

        <div className={classes.tabs}>
          <div
            className={`${props.tab === "tab1" ? classes.tab1 : classes.tab2}`}
            onClick={() => navigate("/login")}
          >
            <p>Login</p>
          </div>
          <div
            className={`${props.tab === "tab2" ? classes.tab1 : classes.tab2}`}
            onClick={() => navigate("/subscription")}
          >
            <p>Subscribe</p>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Header;
