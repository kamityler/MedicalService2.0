import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
// import { Component } from 'react';
import './NavBar.css';

import PatientList from '../../pages/PatientsList/PatientsList';
import About from '../../pages/AboutIDSVAZH/About';
import NoMatch from './../../pages/NoMatch/NoMatch';
import MainPage from '../../pages/MainPage/Main';
import UserPage from '../../pages/UserPage/UserPage';
import PatientPage from './../../pages/PatientPage/PatientPage';
import LoginWindow from './../../pages/LoginWindow/LoginWindow';
import MedCard from './../MedCard/MedCard';


function NavBar(){
    function onGetId(patientID){
        //some code
    }
    return(
        <BrowserRouter>
            <div className="NavBar display">
                <ul className='navigationbar'>
                    <li className='navigationbar-item main-page-li'>
                        <a href="/mainpage">Головна сторінка</a>
                    </li>
                    <li className='navigationbar-item default-li'>
                        <a href="/patientList">Пацієнти</a>
                    </li>
                    <li className='navigationbar-item default-li'>
                        <a href="/about">Про нас</a>
                    </li>
                    <li className='navigationbar-item default-li'>
                        <a href="/settings">Мій кабінет</a>
                    </li>
                    <li className='navigationbar-item default-li log-out'>
                    <a href="/">
        Вийти <CiLogin strokeWidth="1" viewBox="3 -3 24 24" height="1em" ></CiLogin>
      </a>
                        
                    </li>
                </ul>
            </div>    
            <Routes>
                <Route path = "/" element = {<LoginWindow />} />
                <Route path = "/mainpage" element = {<MainPage />} />
                <Route path = "/about" element = {<About />} />
                <Route path = "/patientList" element = {<PatientList onGetId={onGetId}/>}/>
                <Route path = "/patientList/:patientID" element={<PatientPage />}/>
                <Route path = "/patientList/:patientID/records" element={<MedCard />}/>
                <Route path = "/settings" element = {<UserPage />} />
                <Route path = "*" element = {<NoMatch />} />
            </Routes>
        </BrowserRouter>
    );
    // }
}



export default NavBar