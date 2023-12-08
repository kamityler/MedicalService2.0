import {Component} from 'react'

import Patient from '../../components/Patient/Patient'

import './PatientsList.css';


class PatientList extends Component{

    render(){
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";
        return(
            <div className="container-patient-list">
                <div className="container-header">
                    <div className="container-header-item image-item"></div>
                    <div className="container-header-item">Name</div>
                    <div className="container-header-item">Age</div>
                    <div className="container-header-item">Diagnosis</div>
                </div>
                <div className="container-content">
                    <ul className='patient-list'>
                        <Patient url={url} name="Byk" surname="Bychenko" age="38" diagnosis="Rak prostaty"></Patient>
                        <Patient url={url} name="Byk" surname="Bychenko" age="38" diagnosis="Rak prostaty"></Patient>
                    </ul>
                </div>
            </div>

        );
    }
}

export default PatientList