import {useParams} from 'react-router-dom'

import PatientCard from '../../components/PatientCard/PatientCard';
import RecordList from '../../components/RecordList/RecordList';

import './PatientPage.css';

function PatientPage(){
    const { patientID } = useParams();

    return(
        <div className="medical-card-page">
            <div className="patient-card">
               <PatientCard id={patientID}/> 
            </div>
            <RecordList></RecordList>
        </div>
    );
}

export default PatientPage