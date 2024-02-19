import React, { useEffect, useState } from 'react'
import '../Css/login.css';
import img_logo from "../Images/bigcash-logo.png";
import Select from 'react-select';
import { price, subscribeUser } from '../Data/data';
import Get from '../Api/Get';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {loginUser} from   '../Data/data';
// import Post from '../Api/Post';
import { useNavigate } from 'react-router-dom';
import Post from '../Api/Post';

const Subscription = () => {

  const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');


    const options = [
        { value: 'Daily', label: 'Daily ' },
        { value: 'Weekly', label: 'Weekly ' },
        { value: 'Monthly', label: 'Monthly ' },
        // Add more options as needed
      ];
    

      useEffect(()=>{
        callonBackend();
    })
    
      const handleInputChange = (selectedOption) => {
        setSelectedOption(selectedOption);
      };
  
      const handleMobileChange = (event) => {
          // Update mobileNumber state when the input value changes
          setMobileNumber(event.target.value);
      };

      
      const handleLogin = async (e) => {
        if (!selectedOption || selectedOption.value === '' || selectedOption.value ===undefined   || !mobileNumber || mobileNumber.trim() === '' || mobileNumber.trim() === undefined) {
          // Show toast notification for incomplete input
          toast.error('Please fill all fields');
          return;
      }
  
      // Log the selected pack
      console.log('Selected Pack:', selectedOption.value);
  
      // Log the mobile number
      console.log('Mobile Number:', mobileNumber);
      localStorage.setItem("ani",mobileNumber);

      hitforSubscriberuser(mobileNumber,selectedOption.value)
      // setTimeout(()=>{
      //   navigate("/message");
      // },7000)

    //   hitOnBackendForCheckUser(selectedOption.value,mobileNumber);
  
     // Clear the states after handling the login action
        setMobileNumber(null);
        setSelectedOption(null);
  
        };


        const callonBackend=()=>
        {
          let promise = Get(price);
  
          
          promise.then((e)=>{
            console.log("w",e)
              e.forEach((element,index) => {
                  // Your logic for each element goes here
                  let dynamicValue = element.price;
  
                  // Update the label property for the corresponding option
                  options[index].label += dynamicValue;
                });
          })
        }

        const hitforSubscriberuser=(mobileNumber,pack)=>
      {
        console.log("MobNo:",mobileNumber);

        let request = {"ani":mobileNumber,"pack":pack}
        console.log("link",subscribeUser);
        let promise = Post(subscribeUser,request);
        promise.then((e) => {
          console.log("e ", e);
          handlingResponse(e);
        });
      }

  
      const handlingResponse=(e)=>
      {

        console.log("qw",e);
         if(e)
         {
          //not subscriber
          // toast.error('Please subscribe first');
          // setTimeout(()=>{
          //   navigate("/subscription");
          // },3000)

          setTimeout(()=>{
              navigate("/message");
            },1000)
     
         }
        
         else if (e === "Network Error") {
          //Backend Not Working - so sending to error page
          navigate("/error");
        }
        else{
          setTimeout(()=>{
              navigate("/message");
            },1000)
        }

      }
  
  return (
    <>
      <div className="screen-1">
    <img className="logo" src={img_logo} alt="Logo" />
      <div className="dropdown">
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
      <button type="submit" onClick={handleLogin} className="login">SUBSCRIBE</button>
    </div>
    <ToastContainer />
    
  </>
  
  
  )
}

export default Subscription