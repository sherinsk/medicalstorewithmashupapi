import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import './signinsignup.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading2 from "./loading2";

function Signup(props)
{
  const [loading,setLoading]=useState(false)

  const notify = (data) => {toast(data, {
		position: "bottom-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark"
		})};
  
const [showpwd,setShowpwd]=useState(true);
const [showpwd2,setShowpwd2]=useState(true);

function handleClick(e) {
    e.preventDefault();
    props.signinupchange();
}

function passwordhideshow()
{
  setShowpwd(!showpwd)
}

function passwordhideshow2()
{
  setShowpwd2(!showpwd2)
}

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmpwd,setConfirmpwd]=useState("");

function nameinput(e)
{
  setName(e.target.value)
}
function emailinput(e)
{
  setEmail(e.target.value)
}
function passwordinput(e)
{
  setPassword(e.target.value)
}
function confirmpasswordinput(e)
{
  setConfirmpwd(e.target.value)
}

async function PostRegisterData() {
  try {
    setLoading(true);
    const registerdata = { name: name, email: email, password: password, password_confirmation: confirmpwd };
    const response = await axios.post('https://medicalstore.mashupstack.com/api/register', registerdata);
    const id=response.data.id
    console.log(id)
    if(id)
    {
    const msg = `Account creation Successful, Account ID : ${id}`;
    notify(msg);
		setTimeout(() => {props.signinupchange();}, 3000)
    setName("")
    setEmail("")
    setPassword("")
    setConfirmpwd("")
    setLoading(false)
    }
    }
    catch(error) {
    setLoading(false)
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      
      if (errors.email) {
        notify(errors.email);
      }
      if (errors.password_confirmation) {
        notify(errors.password_confirmation);
      }
    } else {
      notify("An unexpected error occurred");
      console.error("Error:", error);
    }
  }
}


    return(
        <div>
             <h5 className="mt-2 text-center"><b>SIGN UP</b></h5>
             <div className="input-group mb-3 mt-3">
              <input type="text" value={name} onChange={nameinput} className="form-control bg-light border border-2" placeholder="enter your name" />
            </div>
            <div className="input-group mb-3 mt-3">
              <input type="text" value={email} onChange={emailinput} className="form-control bg-light border border-2" placeholder="enter your email id" />
            </div>
            <div className="input-group mb-3">
              <input type={showpwd?"password":"text"} value={password} onChange={passwordinput} className="form-control bg-light border border-2" placeholder="enter password" />
              <span className="input-group-text"><button onClick={passwordhideshow} className="btn-i">{showpwd?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</button></span>
            </div>
            <div className="input-group mb-3">
              <input type={showpwd2?"password":"text"} value={confirmpwd} onChange={confirmpasswordinput} className="form-control bg-light border border-2" placeholder="confirm password" />
              <span className="input-group-text"><button onClick={passwordhideshow2} className="btn-i">{showpwd2?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</button></span>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={PostRegisterData} type="button"><b>{loading?<Loading2/>:'SIGN UP'}</b></button>
              <p className="text-center">Already have an account?<span><a onClick={handleClick}>Signin here</a></span></p>
            </div>
            <div>
            <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            </div>
        </div>
    )
}

export default Signup;