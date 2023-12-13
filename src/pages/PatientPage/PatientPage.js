import {useParams} from 'react-router-dom'

import PatientCard from '../../components/PatientCard/PatientCard';
import RecordList from '../../components/RecordList/RecordList';

import './PatientPage.css';

function PatientPage(){
    const { patientID } = useParams();

    return(
        <div className="medical-card-page">
            <div className="patient-card-container"> 
                <PatientCard id={patientID}/> 
                <button className="add-form-button">Add new record</button>
            </div>
            <div className="record-list-container">
                <RecordList id={patientID}></RecordList>
            </div>
        </div>
    );
}

export default PatientPage