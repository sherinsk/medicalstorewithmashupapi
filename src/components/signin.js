import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../authSlice";
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import './signinsignup.css';
import Loading2 from "./loading2";

function Signin(props)
{
  function handleClick(e) {
    e.preventDefault();
    props.signinupchange();
}

const navigate=useNavigate()
const dispatch=useDispatch();
const [loading,setLoading]=useState(false)

const [showpwd,setShowpwd]=useState(true);

function passwordhideshow()
{
  setShowpwd(!showpwd)
}

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

function emailinput(e)
{
  setEmail(e.target.value);
}

function passwordinput(e)
{
  setPassword(e.target.value);
}

async function Attemptlogin()
{
  try
  {
    setLoading(true)
    const logindata = {email:email, password:password};
    const response = await axios.post('https://medicalstore.mashupstack.com/api/login', logindata);
    const token=response.data.token;
    dispatch(loginSuccess(token))
    if(token)
    {
      navigate('/')
    }
    setLoading(false)
  }
  catch(error)
  {
    setLoading(false)
    console.log(error.message)

  }
}


    return(
        <div>
             <h5 className="mt-5"><b>SIGN IN</b></h5>
            <div className="input-group mb-3 mt-3">
              <input type="text" value={email} onChange={emailinput} className="form-control bg-light border border-2" placeholder="enter your registered email id" />
            </div>
            <div className="input-group mb-3">
              <input type={showpwd?"password":"text"} value={password} onChange={passwordinput} className="form-control bg-light border border-2" placeholder="enter your password" />
              <span className="input-group-text"><button className="btn-i" onClick={passwordhideshow}>{showpwd?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</button></span>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={Attemptlogin} type="button"><b>{loading?<Loading2/>:'SIGN IN'}</b></button>
              <p className="text-center">Don't have an account?<span><a onClick={handleClick}>Signup here</a></span></p>
            </div>
        </div>
    )
}

export default Signin;