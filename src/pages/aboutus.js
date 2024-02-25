import React, { useEffect, useState } from "react";
import './addmedicine.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faHouse,faHouseChimneyMedical} from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function About()
{
	
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12">
                    <div className="row">
                        <div className="col-12 bg-light addcontainer rounded shadow mt-2">
                            <h2 className="mt-3 heading text-center"><b><FontAwesomeIcon icon={faHouseChimneyMedical} />ABOUT US</b></h2>
                        </div>
                        <div className="col-12 bg-light mt-2 rounded shadow contact">
                            <div className="p-3 w-100 text-center">
                                <p>
                                At Medicure, we're dedicated to streamlining your medical store inventory management experience. Our platform is designed to empower pharmacists and healthcare professionals with intuitive tools to efficiently organize, track, and manage their inventory.

With a focus on simplicity and effectiveness, Medicure offers a user-friendly interface that allows you to effortlessly monitor stock levels, track expiration dates, and place orders with ease. Whether you're running a small local pharmacy or managing a larger healthcare facility, our platform adapts to your needs, helping you save time and maximize productivity.

Welcome to a smarter, more efficient approach to medical store inventory management. Welcome to Medicure.

                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
    )
}

export default About;