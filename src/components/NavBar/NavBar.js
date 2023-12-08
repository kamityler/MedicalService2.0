import {Component} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './NavBar.css';

import PatientList from '../../pages/PatientsList/PatientsList';
import About from '../../pages/AboutIDSVAZH/About';
import NoMatch from './../../pages/NoMatch/NoMatch';
import MainPage from '../../pages/MainPage/Main';

class NavBar extends Component{

    render(){
        return(
            <Router>
                <div className="NavBar">
                    <ul className='navigationbar'>
                        <li className='navigationbar-item main-page-li'>
                            <a href="/">Main Page</a>
                        </li>
                        <li className='navigationbar-item default-li'>
                            <a href="/patientList">Patients</a>
                        </li>
                        <li className='navigationbar-item default-li'>
                            <a href="/about">About</a>
                        </li>
                    </ul>
                </div>    
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/patientList" element={<PatientList />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Router>
        );
    }
}

export default NavBar