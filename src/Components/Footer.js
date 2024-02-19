import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import home_icon from "../Images/home-white-icon.svg";
import score_icon from "../Images/score-icon.svg";
import leader_icon from "../Images/leader-icon.svg";
import prize_icon from "../Images/prize-icon.svg";
import rectangeblack from "../Images/rectangeblack.png";
import rectangle from "../Images/rectangle.png";

const Footer=(prop)=> {

  //To load on start
  useEffect(()=>{
    checkColor();
  },[]);

  //Hook to store image
  const[image,setImage]=useState('');

  //Method to Get Color according to serviceId
  const checkColor=()=>{
    let serviceId=localStorage.getItem("serviceId");

    if(serviceId==='11')
    {
      //black
      setImage(rectangeblack);
    }
    else if(serviceId==='1')
    {
      //blue
      setImage(rectangle);
    }
    else
    {
      //blue
      setImage(rectangle);
    }
  }

  return (
    <>
      <div className="footer-menu"
         style={{backgroundImage:`url(${image})`}}>
        <div className="col-md-3 col-xs-3">
          <Link to="/home" className={prop.one}>
            <img alt="logo" src={home_icon} />
            Home{" "}
          </Link>
        </div>
        <div className="col-md-3 col-xs-3 active">
          <Link to="/score" className={prop.two}>
            <img alt="logo" src={score_icon} />
            Score{" "}
          </Link>
        </div>
        <div className="col-md-3 col-xs-3">
          <Link to="/leader" className={prop.three}>
            <img alt="logo" src={leader_icon} />
            Leaderboard{" "}
          </Link>
        </div>
        <div className="col-md-3 col-xs-3">
          <Link to="/prize" className={prop.four}>
            <img alt="logo" src={prize_icon} />
            Prizes
          </Link>
        </div>
      </div>
    </>
  );
};
export default Footer;