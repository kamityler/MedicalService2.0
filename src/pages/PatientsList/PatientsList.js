import {Component} from 'react'
import axios from 'axios';

import Patient from '../../components/Patient/Patient'

import './PatientsList.css';

class PatientList extends Component{
    state = {
        patientList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        patientEnded: false
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        this.onPatientListLoading();
        axios.get('https://localhost:5001/api/MedicalRecords/')
            //  .then(res => console.log(res.data))
             .then(response => response.data.map(this.transformPatient))
             .then(res => this.onPatientListLoaded(res));

    }

    transformPatient = (patient) => {
        const birth = new Date(patient.dateOfBirth);
        let age = new Date().getFullYear() - birth.getFullYear();
        return {
            id: patient.patientID,
            name: patient.firstName,
            surname: patient.lastName,
            date: age,
            diagnosis: patient.previousIllnesses
        }
    }


    onPatientListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onPatientListLoaded = (newPatientList) => {
        let ended = false;
        
        if(newPatientList.length < 10){
            ended = true;
        }

        this.setState(({patientList})=>({
            patientList: [...patientList, ...newPatientList],
            loading: false,
            newItemLoading: false,
            patientEnded: ended
        }))
    }

    adjustItems(arr) {
        
    }


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
                        <Patient id={1} url={url} name="Byk" surname="Bychenko" age="38" diagnosis="Rak prostaty"></Patient>
                        <Patient id={2} url={url} name="Normis" surname="Takyy" age="24" diagnosis="Kista v mozku"></Patient>
                        <Patient id={3} url={url} name="Zhal`" surname="Hloptsia" age="18" diagnosis="Minus egg"></Patient>
                        <Patient id={4} url={url} name="Evelina" surname="Krinzh" age="89" diagnosis="Zapor"></Patient>
                        <Patient id={5} url={url} name="Lgbt" surname="Gay" age="11" diagnosis="Pomer"></Patient>
                    </ul>
                </div>

            </div>

        );
    }
}

export default PatientList