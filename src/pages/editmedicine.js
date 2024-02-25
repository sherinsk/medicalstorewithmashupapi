import React, { useEffect, useState } from "react";
import './addmedicine.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Editmedicine()
{
	const {id}=useParams();
	const navigate=useNavigate()
	const [name,setName]=useState('');
	const [company,setCompany]=useState('');
	const [date,setDate]=useState('')
	


	async function Editview() {
    try {
        const token=localStorage.getItem('token');
        const header = { headers: { 'Authorization': `Bearer ${token}` } };
        const response = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/${id}`, header);
        setName(response.data.name);
        setCompany(response.data.company);
        setDate(response.data.expiry_date);
    } catch (err) {
        const data = '404 not found';
        notify(data);
        setTimeout(() => {
            navigate('/');
        }, 1200);
    }
}


	useEffect(() => {
        Editview();
    }, []);

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

	async function posteditedpost()
	{
		try
		{
		const editedmedicine={name:name,company:company,expiry_date:date};
		const token=localStorage.getItem('token');
		const header={headers:{'Authorization':`Bearer ${token}`}}
		const response=await axios.post(`https://medicalstore.mashupstack.com/api/medicine/${id}`,editedmedicine,header)
		const data="one item edited";
		notify(data)
		setTimeout(() => {
            navigate('/');
        }, 1200)
		}
		catch(err)
		{
		const data='404 not found';
		notify(data)
		setTimeout(() => {
            navigate('/login');
        }, 1200)

		}

	}
	async function backhome()
    {
    navigate('/')
    }

    return(
        <div className ="container-fluid">
        <div className="row p-1">
            <div className="col-md-8 offset-md-2 col-12">
              <div className='row mt-3'>
                <div className='col-12 bg-light addcontainer rounded shadow'>
                	<h2 className="mt-5 text-center mb-4 heading"><b><FontAwesomeIcon icon={faPenToSquare} />EDIT MEDICINE</b></h2>
                	<div className="row pb-5 me-2 ms-2">
                		<div className="col-sm-6 col-12">
                			<div className="mb-3">
                				<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Enter medicine name"/>
                			</div>
                		</div>
                		<div className="col-sm-6 col-12">
                			<div className="mb-3">
                				<input type="text" value={company} onChange={(e)=>{setCompany(e.target.value)}} className="form-control" placeholder="Enter Company name"/>
                			</div>
                		</div>
                		<div className="col-12">
                			<div className="mb-3">
                				<input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} className="form-control" placeholder="Enter date"/>
                			</div>
                		</div>
                		<div className="col-sm-6 col-12">
                			<div className="d-grid gap-2 mt-md-3 mt-1">
                				<button className="btn btn-dark btn-outline-success" onClick={posteditedpost} type="button"><b>CONFIRM EDITING</b></button>
                			</div>
                		</div>
                		<div className="col-sm-6 col-12">
                			<div className="d-grid gap-2 mt-md-3 mt-1">
                				<button className="btn btn-dark btn-outline-danger" onClick={backhome} type="button"><b>CANCEL</b></button>
                			</div>
                		</div>
                	</div>

               </div>
              </div>
             </div>
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

export default Editmedicine;