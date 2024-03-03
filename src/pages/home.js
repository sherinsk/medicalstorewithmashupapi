// Home.js
import React from 'react';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/table'
import Loading from '../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus,faCircleLeft,faCircleRight} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './home.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { logout } from "../authSlice";


const Home = () => {
  
  const token=localStorage.getItem('token');
  const dispatch=useDispatch();
  const x=1;

  const navigate=useNavigate()

  const [medicine,setMedicine]=useState([])
  const [input,setInput]=useState("")
  const [loading,setLoading]=useState(true)

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = medicine.slice(firstIndex, lastIndex);
  const npage = Math.ceil(medicine.length / recordsPerPage);
  const maxVisiblePages = Math.min(3, npage); // Ensure maximum of 3 visible pages
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), npage - maxVisiblePages + 1));
  const endPage = Math.min(npage, startPage + maxVisiblePages - 1);
  const visibleNumbers = [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };


  useEffect(()=>{fetchmedicine();},[])

  async function fetchmedicine(){
    try
    {
    const token=localStorage.getItem('token');
    const header={headers:{'Authorization':`Bearer ${token}`}}
    const response=await axios.get('https://medicalstore.mashupstack.com/api/medicine',header);
    setMedicine(response.data)
    setLoading(false)
    }
    catch(err)
    {
      dispatch(logout(token));
      navigate('/login')
    }
    
  }

  const notify = (data) => {toast(data, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
    })};

 

  async function deletemedicine(id){
    try
    {
    const token=localStorage.getItem('token');
    const header={headers:{'Authorization':`Bearer ${token}`}}
    const response=await axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${id}`,header);
    var message="1 item deleted"
    notify(message)
    const response2 = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${input}`,header)
    setMedicine(response2.data)
    if(records.length===1)
    {
      setCurrentPage(currentPage-1)
    }
    }
    catch(err)
    {
      dispatch(logout(token));
      navigate('/login')
    }
  }

  async function handleInputChange(e) {
    try
    {
    setLoading(true)
    const token=localStorage.getItem('token');
    const header={headers:{'Authorization':`Bearer ${token}`}}
    const inputValue = e.target.value;
    setInput(inputValue);
    const response = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${inputValue}`,header);
    if(response.data.errors)
    {
      navigate('/login')
    }
    else
    {
    setMedicine(response.data);
    setLoading(false)
    setCurrentPage(1)
    }
    }
    catch(err)
    {
      dispatch(logout(token));
      navigate('/login')
    }
    }

  async function addmedicine()
  {
    navigate("/addmedicine")
  }

  
  
  
  
  
  return(
    <div className ="container-fluid">
        <div className="row">
            <div className="col-md-8 offset-md-2 col-12">
              <div className='row mt-3'>
                <div className='col-8'>
                <div className="input-group">
                  <input type="text" value={input} onChange={handleInputChange} placeholder='🔍Search for medicine' class="form-control" aria-label="Text input with radio button"/>
                </div>
                </div>
                <div className='col-4'>
                <div className="d-grid gap-2">
                  <button class="btn btn-dark btn-outline-light" onClick={addmedicine} type="button"><FontAwesomeIcon icon={faCirclePlus} /><b>{" ".repeat(3)+'ADD ITEM'}</b></button>
                </div>
                </div>
              </div>
              <div className='table-container mt-4'>
              {loading?<Loading/>:<Table medicine={records} deletemedicine={deletemedicine} currentPage={currentPage} recordsPerPage={recordsPerPage}/>}
              </div>
              <div className='row'>
                <div className='col-12 d-flex justify-content-end mt-3'>
                <nav className={npage<=1?'d-none':'d-block'}>
        <ul className="pagination fixed-pagination">
          <li className="page-item">
            <a className="page-link btn btn-dark me-2" onClick={prePage}><FontAwesomeIcon icon={faCircleLeft} /></a>
          </li>
          {visibleNumbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a className="page-link btn btn-dark me-2" onClick={() => changeCPage(n)}>{n}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link btn btn-dark" onClick={nextPage}><FontAwesomeIcon icon={faCircleRight} /></a>
          </li>
        </ul>
      </nav>
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


export default Home;
