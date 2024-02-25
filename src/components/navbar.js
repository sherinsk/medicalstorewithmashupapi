import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket,faAddressCard,faPhone,faHouseChimneyMedical} from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../authSlice";
import axios from 'axios';
import Loading2 from "./loading2";


const Navbar = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const hideNavbar=location.pathname==='/login'
  const [loading,setLoading]=useState(false)
  if(hideNavbar)
  {
    return null;
  }

  async function logoutSuccess()
  {
  try
  {
  setLoading(true)
  const token=localStorage.getItem('token');
  const header={headers:{'Authorization':`Bearer ${token}`}};
  const response=await axios.post('https://medicalstore.mashupstack.com/api/logout',null,header);
  dispatch(logout(token));
  navigate('/login')
  setLoading(false)
  }
  catch(err)
  {
    navigate('/login')
  }
  }

  return (
  
  <React.Fragment>
    <div className="bg-light rounded fontStyle2 m-2 mt-3 shadow">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center" id="removeFlex">
          <h4 id='title'><b><FontAwesomeIcon icon={faHouseChimneyMedical} />MEDICURE</b></h4>
          <div className="d-flex justify-content-center" style={{position:'relative',left:'-15px'}}>
            <NavLink to="/about" className="d-inline-block customNav d-sm-block d-none"><FontAwesomeIcon icon={faAddressCard}/></NavLink>
            <NavLink to="/" className="d-inline-block customNav d-sm-block d-none"><FontAwesomeIcon icon={faHouse}/></NavLink>
            <NavLink to="/contact" className="d-inline-block customNav d-sm-block d-none"><FontAwesomeIcon icon={faPhone}/></NavLink></div>
            <div className="m-1">
              <button className='btn btn-unstyled' onClick={logoutSuccess}>{loading?<Loading2/>:<FontAwesomeIcon icon={faRightFromBracket}/>}</button>
            </div>
          </div>
        </div>
        </div>
        <div>
          <div className="d-flex border border-dark m-1">
            <NavLink to="/about" className="d-inline-block customNav1 d-sm-none d-block"><FontAwesomeIcon icon={faAddressCard} /></NavLink>
            <NavLink to="/" className="d-inline-block customNav1 d-sm-none d-block"><FontAwesomeIcon icon={faHouse}/></NavLink>
            <NavLink to="/contact" className="d-inline-block customNav1 d-sm-none d-block"><FontAwesomeIcon icon={faPhone}/></NavLink></div>
          </div>
    </React.Fragment>
  );
};

export default Navbar;
