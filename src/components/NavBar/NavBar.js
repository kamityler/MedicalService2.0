import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
import { useState, useEffect } from 'react'; // Додано для керування станом адаптивного меню
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
    let [menuOpen,setMenuOpen] = useState(true); 
    
    
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 600 && menuOpen) {
            setMenuOpen(true);
          }
          if (window.innerWidth <= 600 ) {
            setMenuOpen(true);
          }
          
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [menuOpen]);
      // Стан для керування відкриттям/закриттям меню
    function onGetId(patientID){
        //some code
    }
    return(
        <BrowserRouter>
      <div className={`NavBar ${menuOpen ? 'menu-open' : ''}`}>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <ul className={`navigationbar ${menuOpen ? 'display' : 'display-none'}`}>
          <li className='navigationbar-item main-page-li'>
            <a href="/mainpage" onClick={() => setMenuOpen(false)}>
              Головна сторінка
            </a>
          </li>
          <li className='navigationbar-item default-li'>
            <a href="/patientList" onClick={() => setMenuOpen(false)}>
              Пацієнти
            </a>
          </li>
          <li className='navigationbar-item default-li'>
            <a href="/about" onClick={() => setMenuOpen(false)}>
              Календар
            </a>
          </li>
          <li className='navigationbar-item default-li'>
            <a href="/settings" onClick={() => setMenuOpen(false)}>
              Мій кабінет
            </a>
          </li>
          <li className='navigationbar-item default-li log-out'>
            <a href="/" onClick={() => setMenuOpen(false)}>
              Вийти <CiLogin strokeWidth="1" viewBox="3 -3 24 24" height="1em" />
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
                <Route path = "/patientList/:patientID/records/:filter" element={<MedCard/>}/>
                <Route path = "/settings" element = {<UserPage />} />
                <Route path = "*" element = {<NoMatch />} />
            </Routes>
        </BrowserRouter>
    );
    // }
}



export default NavBar