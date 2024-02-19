import React, { useState } from "react";
import "../Css/login.css";
import img_logo from "../Images/bigcash-logo.png";
import footer_logo from "../Images/logomain.png";
import Select from "react-select";
// import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../Data/data";
import Post from "../Api/Post";
import { useNavigate } from "react-router-dom";
import "sweetalert2/dist/sweetalert2.min.css";
// import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';
import Swal from "sweetalert2";
import classes from "../Css/LoginPage.module.css";
import { MdPhoneAndroid } from "react-icons/md";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import Loading from "../Components/Loading";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  // useEffect(()=>{
  //     callonBackend();
  // })

  const options = [
    { value: "Daily", label: "Daily " },
    { value: "Weekly", label: "Weekly " },
    { value: "Monthly", label: "Monthly " },
    // Add more options as needed
  ];

  const handleInputChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleMobileChange = (event) => {
    // Update mobileNumber state when the input value changes
    setMobileNumber(event.target.value);
  };

  const handleLogin = async (e) => {
    if (
      !mobileNumber ||
      mobileNumber.trim() === "" ||
      mobileNumber.trim() === undefined
    ) {
      //!selectedOption || selectedOption.value === '' || selectedOption.value ===undefined   ||
      // Show toast notification for incomplete input
      toast.error("Please fill all fields");
      return;
    }

    // Log the selected pack
    // console.log('Selected Pack:', selectedOption.value);

    // Log the mobile number
    console.log("Mobile Number:", mobileNumber);
    localStorage.setItem("ani", mobileNumber);

    hitOnBackendForCheckUser(mobileNumber);

    // Clear the states after handling the login action
    // setMobileNumber("");
    setSelectedOption(null);
  };

  // const callonBackend=()=>
  // {
  //   let promise = Get(price);

  //   promise.then((e)=>{
  //       e.forEach((element,index) => {
  //           // Your logic for each element goes here
  //           let dynamicValue = element.amount;

  //           // Update the label property for the corresponding option
  //           options[index].label += dynamicValue;
  //         });
  //   })
  // }

  const hitOnBackendForCheckUser = (mobileNumber) => {
    console.log("MobNo:", mobileNumber);

    let request = { ani: mobileNumber };
    console.log("link", loginUser);
    setLoading(true);
    let promise = Post(loginUser, request);
    promise.then((e) => {
      console.log("e ", e);
      handlingResponse(e);
    });
  };

  const handlingResponse = (e) => {
    if (e === 0) {
      setLoading(false);

      setOpenModal(true);
    } else if (e === 2) {
      //billing pending
      setLoading(false);
      toast.error("Billing Pending");
      return;
    } else if (e === 1) {
      //give access to portal
      localStorage.setItem("ani", mobileNumber);
      localStorage.setItem("pack", null);
      setLoading(false);

      navigate("/otp");
      // navigate("/home");
    } else if (e === "Network Error") {
      setLoading(false);

      //Backend Not Working - so sending to error page
      navigate("/error");
    } else {
      setLoading(false);

      toast.error("Please subscribe first");
      return;
    }
  };

  return (
    <>
      <Header tab="tab1">
        <div className={classes.align_center}>
        <div className={classes.form_container}>
          <div className={classes.input_container}>
              <p>+263</p>
            <input
              className={classes.input}
              type="number"
              name="number"
              value={mobileNumber}
              onChange={handleMobileChange}
              placeholder="Enter your mobile number"
            />
          </div>
          <button type="submit" onClick={handleLogin} className={classes.btn}>
            Login
          </button>
        </div>
        <div className={classes.footer_container}>
          <img src={footer_logo} alt="econet" className={classes.footer_logo} />
          <p>
            By clicking <b>login</b>, you have read, understood 
            and agree to be bound by the YoGames360 service’s
            <b>& Conditions and FAQ’s</b></p>
        </div>
        <div>{loading && <Loading />}</div>

        {/* <ToastContainer /> */}
        <Toaster
          position="top-center"
          style={{
            marginTop: "5em", // Adjust the margin to center the notification vertically
          }}
        />
        {/* <div className={classes.footer_container}>
          <img src={footer_logo} alt="econet" className={classes.footer_logo} />
          <p>
            By clicking <b>login</b>, you have read, understood 
            and agree to be bound by the YoGames360 service’s
            <b>& Conditions and FAQ’s</b></p>
        </div> */}
        </div>
      </Header>
      <Modal open={openModal} closeHandler={closeModal} />
    </>
  );
};

export default LoginPage;
