import React,{ useState } from "react";
import './addmedicine.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addmedicine()
{
	const [name,setName]=useState("");
	const [company,setCompany]=useState("");
	const [date,setDate]=useState("");
	const navigate=useNavigate()

	async function backhome()
    {
    navigate('/')
    }

	function nameInput(e)
	{
		setName(e.target.value)
	}

	function companyInput(e)
	{
		setCompany(e.target.value)
	}


	function dateInput(e) {
		setDate(e.target.value);
	}

	async function postdata()
	{
		try
		{
		if(name.trim()===""||company.trim()==""||date.trim()==="")
		{
			const data="Fields can't be empty";
			notify(data);
		}
		else
		{
		const postmed={name:name,company:company,expiry_date:date}
		const token=localStorage.getItem('token');
        const header={headers:{'Authorization':`Bearer ${token}`}}
		const response=await axios.post('https://medicalstore.mashupstack.com/api/medicine',postmed,header)
		const data="✔️one medicine added";
		notify(data)
		setTimeout(() => {
            navigate('/');
        }, 2100)
	    }
	    }
		catch(err)
		{
			navigate('/login')
		}
	}

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


    return(
        <div className ="container-fluid">
        <div className="row p-1">
            <div className="col-md-8 offset-md-2 col-12">
              <div className='row mt-3'>
                <div className='col-12 bg-light addcontainer rounded shadow'>
                	<h2 className="mt-5 text-center mb-4 heading"><b><FontAwesomeIcon icon={faCirclePlus} />ADD MEDICINE</b></h2>
                	<div className="row pb-5 me-2 ms-2">
                		<div className="col-sm-6 col-12">
                			<div className="mb-3">
                				<input type="text" value={name} onChange={nameInput} className="form-control" placeholder="Enter medicine name"/>
                			</div>
                		</div>
                		<div className="col-sm-6 col-12">
                			<div className="mb-3">
                				<input type="text" value={company} onChange={companyInput} className="form-control" placeholder="Enter Company name"/>
                			</div>
                		</div>
                		<div className="col-12">
                			<div className="mb-3">
                				<input type="date" id="date" value={date} onChange={dateInput} className="form-control" placeholder="Select the expiry date"/>
								<label for date className="d-flex justify-content-end"><b>EXPIRY-DATE</b></label>
                			</div>
                		</div>
                		<div className="col-sm-6 col-12">
                			<div className="d-grid gap-2 mt-md-3 mt-1">
                				<button className="btn btn-dark btn-outline-success" onClick={postdata} type="button"><b>CONFIRM ADDING</b></button>
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

export default Addmedicine;