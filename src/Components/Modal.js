import React from "react";
import classes from "./Modal.module.css";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Modal = ({open,closeHandler}) => {
    const navigate=useNavigate();

    const handleNavigate=()=>{
        closeHandler();
        setTimeout(()=>{
            navigate("/subscription");
        },500)
    }
    const closeModal=()=>{
        closeHandler();
        // console.log("close the modal with animation");
    }
  return (
    <div className={`${open ? `${classes.modal_container} ${classes.modal_show}` : classes.modal_container}`}>
      <div className={classes.modal_sub_container}>
        <div className={classes.icon}>
          <IoIosWarning className={classes.icon_style}/>
        </div>
        <div className={classes.modal_content}>
            <div className={classes.main_heading}>
                <p>You are not subscriber</p>
            </div>
            <div className={classes.paragraph}>
                <p>Do you want to subscibe BigCash</p>
            </div>
        </div>
        <div className={classes.btn_container}>
            <button className={classes.confirm_btn} onClick={handleNavigate}>
                Yes
            </button>
            <button className={classes.cancel_btn} onClick={closeModal}>
                No
            </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
