import {useParams} from 'react-router-dom'

import PatientCard from '../../components/PatientCard/PatientCard';
import RecordList from '../../components/RecordList/RecordList';

import './PatientPage.css';

function PatientPage(){
    const { patientID } = useParams();

    return(
        <div className="medical-card-page">
            <PatientCard className="patient-card" id={patientID}/> 
            <RecordList className="record-list" id={patientID}></RecordList>
        </div>
    );
}

export default PatientPage