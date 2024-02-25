import React, { useEffect, useState } from "react";
import './addmedicine.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquarePhone,faWhatsapp} from '@fortawesome/free-solid-svg-icons'
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
                            <h2 className="mt-3 heading text-center"><b><FontAwesomeIcon icon={faSquarePhone} />CONTACT US</b></h2>
                        </div>
                        <div className="col-12 bg-light mt-2 rounded shadow">
                            <div className="p-3 w-100 text-center">
                                <b><p>Phone : 7025032864</p>
                                <p>Email : sherinsk007@gmail.com</p></b>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
    )
}

export default About;