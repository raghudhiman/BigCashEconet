import React from 'react'
import process from "../Images/process.png";
import '../Css/showmessage.css';

const ShowMessage = () => {
  return (
    <>
    <div className="container">
    <img className="icon" src={process} alt="Checkmark Icon" />
    <h2>Your Subscription In Process</h2>
    <p>
      Thank you for subscribing! You will get Notify by sms.
    </p>
  </div>
    </>
  )
}

export default ShowMessage