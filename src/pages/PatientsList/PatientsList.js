import {Component} from 'react'
import axios from 'axios';

import Patient from '../../components/Patient/Patient'
import Spinner from '../../components/spinner/Spinner';

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
        const items = arr.map((item)=>{
            return (
                <Patient id={item.id} key={item.id} url={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"} name={item.name} surname={item.surname} age={item.age} diagnosis={item.diagnosis}></Patient>
            )
        })

        return(
            <ul className='patient-list'>
                {items}
            </ul>
        )
    }


    render(){ 
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";
        const {loading, patientList} = this.state;
        const adjustedList = this.adjustItems(patientList);

        const spinnerComponent = loading ? <Spinner/> : null;

        const content = !loading ? adjustedList : null

        return(
            <div className="container-patient-list">
                <div className="container-header">
                    <div className="container-header-item image-item"></div>
                    <div className="container-header-item">Name</div>
                    <div className="container-header-item">Age</div>
                    <div className="container-header-item">Diagnosis</div>
                </div>
                <div className="container-content">
                    {spinnerComponent}
                    {content}
                </div>

            </div>

        );
    }
}

export default PatientList