import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import About from './pages/aboutus';
import Addmedicine from './pages/addmedicine'
import Editmedicine from './pages/editmedicine'
import Login from './pages/login'
import myImage from './assets/pharmacist.jpg'
import Viewmedicine from './pages/viewmedicine';
import Contact from './pages/contactus';
import {useSelector} from 'react-redux';

const App = () => {

  const isLoggedin=useSelector(state=>state.auth.isAuthenticated)

  return (
    <Router>
      <div className='container-fluid'>
        <Navbar />
        <Routes>
          <Route path="/login" element={isLoggedin?<Navigate to="/"/>:<Login/>}/>
          <Route exact path="/" element={isLoggedin?<Home/>:<Navigate to="/login"/>} />
          <Route path="/contact" element={isLoggedin?<Contact/>:<Navigate to="/login"/>} />
          <Route path="/addmedicine" element={isLoggedin?<Addmedicine/>:<Navigate to="/login"/>}/>
          <Route path="/about" element={isLoggedin?<About/>:<Navigate to="/login"/>}/>
          <Route path="/view/:id" element={isLoggedin?<Viewmedicine/>:<Navigate to="/login"/>}/>
          <Route path="/editmedicine/:id" element={isLoggedin?<Editmedicine/>:<Navigate to="/login"/>}/>
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes> 
      </div>
    </Router>
  );
};

export default App;
