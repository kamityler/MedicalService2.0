import {Component} from 'react'
import axios from 'axios';

import Patient from '../../components/Patient/Patient'
import Spinner from '../../components/spinner/Spinner';

import './PatientsList.css';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

class PatientList extends Component{
    constructor(props){
        super(props);
        this.state = {
            patientList: [],
            loading: true,
            error: false,
            newItemLoading: false,
            patientEnded: false,
            errorPurpose: 'unknown' 
        }
    }

    componentDidMount() {
        this.onRequest();

    }

    onRequest = () => {
        this.onPatientListLoading();
        axios.get('https://localhost:5001/api/MedicalRecords/')
            //  .then(data=>console.log(data))
             .then(response => response.data.map(this.transformPatient))
             .then(res => this.onPatientListLoaded(res))
             .catch(this.onError);
    }

    onPatientListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    transformPatient = (patient) => {
        const birth = new Date(patient.dateOfBirth);
        let age = new Date().getFullYear() - birth.getFullYear();
        return {
            id: patient.patientID,
            name: patient.firstName,
            surname: patient.lastName,
            age: age,
            diagnosis: patient.previousIllnesses
        }
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

    onError = (errorBody) => {
        this.setState({
            error: true,
            loading: false,
            errorPurpose: errorBody.message
        })
    }

    adjustItems(arr) {
        const items = arr.map((item)=>{
            return (
                <Patient 
                    key={item.id}
                    id={item.id} 
                    url={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"} 
                    name={item.name} 
                    surname={item.surname} 
                    age={item.age} 
                    diagnosis={item.diagnosis}
                    onGetId = { () => this.props.onGetId(item.id) }>
                </Patient>
            )
        })

        return(
            <ul className='patient-list'>
                {items}
            </ul>
        )
    }


    render(){ 
        const {loading, patientList, error} = this.state;
        const adjustedList = this.adjustItems(patientList);

        const spinnerComponent = loading ? <Spinner/> : null;
        const errorComponent = 
            error ? 
            <ErrorMessage 
                errorMessage={'List cannot be displayed'} 
                errorPurpose={this.state.errorPurpose}/> 
            : null;

        const content = !(loading||error) ? adjustedList : null;

        return(
            <div className="container-patient-list">
                <div className="container-header">
                    <div className="container-header-item image-item"></div>
                    <div className="container-header-item">Name</div>
                    <div className="container-header-item">Age</div>
                    <div className="container-header-item">Diagnosis</div>
                </div>
                <div className="container-content">
                    {errorComponent}
                    {spinnerComponent}
                    {content}
                </div>

            </div>

        );
    }
}

export default PatientList