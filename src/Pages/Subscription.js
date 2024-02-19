import React, { useEffect, useState } from "react";
import "../Css/login.css";
// import img_logo from "../Images/bigcash-logo.png";
import Select from "react-select";
import { price, subscribeUser } from "../Data/data";
import Get from "../Api/Get";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
// import {loginUser} from   '../Data/data';
// import Post from '../Api/Post';
import { useNavigate } from "react-router-dom";
import Post from "../Api/Post";
import classes from "../Css/Subscription.module.css";
import Header from "../Components/Header";
import footer_logo from "../Images/logomain.png";
import Loading from "../Components/Loading";

const Subscription = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    { value: "Daily", label: "Daily " },
    { value: "Weekly", label: "Weekly " },
    { value: "Monthly", label: "Monthly " },
    // Add more options as needed
  ];

  useEffect(() => {
    callonBackend();
  });

  const handleInputChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleMobileChange = (event) => {
    // Update mobileNumber state when the input value changes
    setMobileNumber(event.target.value);
  };

  const handleLogin = async (e) => {
    if (
      !selectedOption ||
      selectedOption.value === "" ||
      selectedOption.value === undefined ||
      !mobileNumber ||
      mobileNumber.trim() === "" ||
      mobileNumber.trim() === undefined
    ) {
      // Show toast notification for incomplete input
      toast.error("Please fill all fields");
      return;
    }

    // Log the selected pack
    console.log("Selected Pack:", selectedOption.value);

    // Log the mobile number
    console.log("Mobile Number:", mobileNumber);
    localStorage.setItem("ani", mobileNumber);

    hitforSubscriberuser(mobileNumber, selectedOption.value);
    // Clear the states after handling the login action
    setMobileNumber(null);
    setSelectedOption(null);
  };

  const callonBackend = () => {
    let promise = Get(price);

    promise.then((e) => {
      console.log("w", e);
      e.forEach((element, index) => {
        // Your logic for each element goes here
        let dynamicValue = element.price;

        // Update the label property for the corresponding option
        options[index].label += dynamicValue;
      });
    });
  };

  const hitforSubscriberuser = (mobileNumber, pack) => {
    console.log("MobNo:", mobileNumber);

    let request = { ani: mobileNumber, pack: pack };
    console.log("link", subscribeUser);
    setLoading(true);
    let promise = Post(subscribeUser, request);
    promise.then((e) => {
      console.log("e ", e);
      handlingResponse(e);
    });
  };

  const handlingResponse = (e) => {
   
    if (e === 1) {
      setLoading(false);
      
      toast.error("Billing Pending");
      return;
    } else if (e === 2) {
      setTimeout(() => {
        setLoading(false);
        navigate("/otp");
      }, 1000);
    } else if (e === "Network Error") {
      setLoading(false);

      //Backend Not Working - so sending to error page
      navigate("/error");
    } else if(e===0) {
        toast.error("Billing Pending");
      return;
    }
    else if(e===3)
    {
      setTimeout(() => {
        setLoading(false);
        navigate("/otp");
      }, 1000);
    }
    else
    {
      toast.error("Billing Pending");
      return;
    }
  };

  return (
    <>
      {/* <div className="screen-1">
    <img className="logo" src={img_logo} alt="Logo" /> */}
      <Header tab="tab2">
        <div className={classes.form_container}>
          <div className={classes.input_container}>
              <p>+263</p>
            <input
              className={classes.input}
              type="number"
              name="number"
              onChange={handleMobileChange}
              placeholder="Enter your mobile number"
            />
          </div>
          <div className={classes.dropdown_container}>
            <Select
              className={classes.selector}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#00063f",
                  color: "white",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "white", // Change the color of the text inside the box
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "white", // Change the color of the placeholder text
                }),
              }}
              value={selectedOption}
              onChange={handleInputChange}
              options={options}
              placeholder="Select Pack"
              required
            />
          </div>
          <button type="submit" onClick={handleLogin} className={classes.btn}>
            Subscribe
          </button>
        </div>

        <div>{loading && <Loading />}</div>

        <div className={classes.footer_container}>
          <img src={footer_logo} alt="econet" className={classes.footer_logo} />
          <p>
            By subscribing <b></b>, you have read, understood 
            and agree to be bound by the YoGames360 service’s
            <b>& Conditions and FAQ’s</b></p>
        </div>
      </Header>

      {/* <ToastContainer /> */}
      <Toaster
       position="top-center"
       style={{
         marginTop: "5em", // Adjust the margin to center the notification vertically
       }}
      />
    </>
  );
};

export default Subscription;
