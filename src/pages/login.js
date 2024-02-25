import React, { useState } from "react";
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouseChimneyMedical,faEye} from '@fortawesome/free-solid-svg-icons';
import myImage from '../assets/pharmacist.jpg'
import Signin from "../components/signin";
import Signup from "../components/signup";
function Login()
{
  const [signin,setSignin]=useState(true)

  function signinupchange()
  {
    setSignin(!signin);
  }




    return(
        <div className="container-fluid">
    <div className="row">
      <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-12">
        <div className="row inner rounded">
          <div className="col-md-5 col-12">
          <div className="m-3">
            <h4 className="title mt-3 text-center"><b><FontAwesomeIcon icon={faHouseChimneyMedical} />MEDICURE</b></h4>
            {signin?<Signin signin={signin} signinupchange={signinupchange}/>:<Signup signin={signin} signinupchange={signinupchange}/>}
          </div>
        </div>
          <div className="col-md-7 parent d-md-block d-none">
            <img className="rounded " src={myImage}/>
            <div className="text-overlay welcome">
              <h3 className="m-2 text-dark animation">welcome to <b className="title"><FontAwesomeIcon icon={faHouseChimneyMedical} />MEDICURE</b></h3>
            </div>
            
          </div>         
        </div>
      
    </div>
  </div>
  </div>
    )
}

export default Login;