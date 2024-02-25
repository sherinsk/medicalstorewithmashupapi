import React, { useEffect, useState } from "react";
import './addmedicine.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faHouse} from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Viewmedicine()
{
	const {id}=useParams();
	const navigate=useNavigate()
	const [name,setName]=useState('');
	const [company,setCompany]=useState('');
	const [date,setDate]=useState('')
	


	async function ViewMed() {
    try {
        const token=localStorage.getItem('token');
        const header = { headers: { 'Authorization': `Bearer ${token}` } };
        const response = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/${id}`, header);
        setName(response.data.name);
        setCompany(response.data.company);
        setDate(response.data.expiry_date);
    } catch (err) {
        navigate('/login')
    }
}

useEffect(() => {
    ViewMed();
}, []);

async function backhome()
{
    navigate('/')
}



    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12">
                    <div className="row">
                        <div className="col-12 bg-light addcontainer rounded shadow mt-5">
                            <h2 className="mt-3 heading text-center"><b><FontAwesomeIcon icon={faEye} />VIEW MEDICINE</b></h2>
                        </div>
                        <div className="col-12 bg-light addcontainer rounded shadow mt-3 p-5">
                            <h5 className="mt-1"><b>NAME : {name}</b></h5>
                            <h5 className="mt-1"><b>COMPANY : {company}</b></h5>
                            <h5 className="mt-1"><b>EXPIRY-DATE : {date}</b></h5>
                        <div className="d-flex flex-row col-12 justify-content-end mt-4">
                            <button className="btn btn-dark btn-outline-tertiary" onClick={backhome} type="button">Back to <FontAwesomeIcon icon={faHouse} /></button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Viewmedicine;