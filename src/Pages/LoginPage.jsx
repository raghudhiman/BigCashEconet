import React, { useEffect, useState } from 'react'
import '../Css/login.css';
import img_logo from "../Images/bigcash-logo.png";
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {loginUser} from   '../Data/data';
import Post from '../Api/Post';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const LoginPage = () => {


  const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect(()=>{
      if(localStorage.getItem("ani")==="null" ||localStorage.getItem("ani")===undefined )
    {
      navigate("/login");
    }
    })

    const options = [
      { value: 'Daily', label: 'Daily ' },
      { value: 'Weekly', label: 'Weekly ' },
      { value: 'Monthly', label: 'Monthly ' },
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
      if (!mobileNumber || mobileNumber.trim() === '' || mobileNumber.trim() === undefined)  //!selectedOption || selectedOption.value === '' || selectedOption.value ===undefined   || 
      {
        // Show toast notification for incomplete input
        toast.error('Please fill all fields');
        return;
    }

    // Log the selected pack
    // console.log('Selected Pack:', selectedOption.value);

    // Log the mobile number
    console.log('Mobile Number:', mobileNumber);
    localStorage.setItem("ani",mobileNumber);

    hitOnBackendForCheckUser(mobileNumber);

   // Clear the states after handling the login action
      setMobileNumber('');
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


      const hitOnBackendForCheckUser=(mobileNumber)=>
      {
        console.log("MobNo:",mobileNumber);

        let request = {"ani":mobileNumber}
        console.log("link",loginUser);
        let promise = Post(loginUser,request);
        promise.then((e) => {
          console.log("e ", e);
          handlingResponse(e);
        });
      }

      const handlingResponse=(e)=>
      {

         if(e===0)
         {
          //not subscriber
          // toast.error('Please subscribe first');
          // setTimeout(()=>{
          //   navigate("/subscription");
          // },3000)
          Swal.fire({
            title: 'You are not a subscriber',
            text: 'Do you want to subscribe to BigCash?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes', // Change the text of the confirm button to 'Yes'
            cancelButtonText: 'No'    // Change the text of the cancel button to 'No'
         }).then((result) => {
          console.log("result",result.isConfirmed)
          
           if(result.isConfirmed)
           {
            console.log("isConfirmed",result.isConfirmed)
            setTimeout(()=>{
                navigate("/subscription");
              },3000)
           }
         })
          return;
         }
         else if(e===2)
         {
          //billing pending
          toast.error('Billing Pending');
          return;
         }
         else if(e===1)
         {
          //give access to portal
          navigate("/otp");

         }
         else if (e === "Network Error") {
          //Backend Not Working - so sending to error page
          navigate("/error");
        }
        else{
          toast.error('Please subscribe first');
          return;
        }

      }

  return (
    <>
   
    <div className="screen-1">
    <img className="logo" src={img_logo} alt="Logo" />
      <div className="dropdown" style={{display : 'none'}}>
          <Select
            value={selectedOption}
            onChange={handleInputChange}
            options={options}
            placeholder="Select Pack"
            required
          />
        </div>
      <div className="email">
      <label htmlFor="number">Mobile Number</label>
      <div className="sec-2">
        <ion-icon name="mail-outline" />
        <p><b style={{color:'red'}}>Enter Mobile No. Without Zero and Without Country Code</b></p>
        <input type="number" name="number" onChange={handleMobileChange} placeholder="Enter your mobile number" />
      </div>
    </div>
      <button type="submit" onClick={handleLogin} className="login">Login</button>
    </div>
    <ToastContainer />
    
  </>
  
  )
}

export default LoginPage