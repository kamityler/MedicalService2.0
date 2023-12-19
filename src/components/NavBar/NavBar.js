import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import { Component } from 'react';
import './NavBar.css';

import PatientList from '../../pages/PatientsList/PatientsList';
import About from '../../pages/AboutIDSVAZH/About';
import NoMatch from './../../pages/NoMatch/NoMatch';
import MainPage from '../../pages/MainPage/Main';
import UserPage from '../../pages/UserPage/UserPage';
import PatientPage from './../../pages/PatientPage/PatientPage';
import LoginWindow from './../../pages/LoginWindow/LoginWindow';


function NavBar(){
    function onGetId(patientID){
        //some code
    }
    return(
        <BrowserRouter>
            <div className="NavBar display">
                <ul className='navigationbar'>
                    <li className='navigationbar-item main-page-li'>
                        <a href="/mainpage">Main Page</a>
                    </li>
                    <li className='navigationbar-item default-li'>
                        <a href="/patientList">Patients</a>
                    </li>
                    <li className='navigationbar-item default-li'>
                        <a href="/about">About</a>
                    </li>
                    <li className='navigationbar-item default-li'>
                        <a href="/settings">My account</a>
                    </li>
                </ul>
            </div>    
            <Routes>
                <Route path = "/" element = {<LoginWindow />} />
                <Route path = "/mainpage" element = {<MainPage />} />
                <Route path = "/about" element = {<About />} />
                <Route path = "/patientList" element = {<PatientList onGetId={onGetId}/>}/>
                <Route path = "/patientList/:patientID" element={<PatientPage />}/>
                <Route path = "/settings" element = {<UserPage />} />
                <Route path = "*" element = {<NoMatch />} />
            </Routes>
        </BrowserRouter>
    );
    // }
}



export default NavBar