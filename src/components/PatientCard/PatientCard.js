import {Component} from 'react'
import axios from 'axios';

import './PatientCard.css';

import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

class PatientCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            patient: {
                id: props.id,
                name: 'name',
                surname: 'surname',
                gender: 'gender',
                dateOfBirth: 'dateOfBirth',
                address: 'address',
                email: 'email',
                phone: 'phone',
                // description: 'description'
            },
            loading: true,
            error: false,
            errorPurpose: 'unknown'
        }
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.patient.id}`)
            //  .then(response=>console.log(response.data))
             .then(response => this.transformPatient(response.data))
             .then(result => this.onPatientInfoLoaded(result))
             .catch(this.onError);
    }

    transformPatient = (response) => {
        const date = (item) => {
            const dateArr = item.split("-")
            return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
        }

        return({
            name: response.firstName,
            surname: response.lastName,
            gender: response.gender,
            dateOfBirth: date(response.dateOfBirth),
            address: response.address,
            email: response.email,
            phone: response.phoneNumber,
        })
    }

    onPatientInfoLoaded = (info) => {
        this.setState(()=>({
            patient: info,
            loading: false
        }))
    }

    onError = (errorBody) => {
        this.setState({
            error: true,
            loading: false,
            errorPurpose: errorBody.message
        })
    }

    htmlFunc = () => {
        const {id, name, surname, dateOfBirth, address, email, phone, gender} = this.state.patient
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";

        return(
            <div id={id} className="patient-card">
                <ul className="patient-info-ul">
                    <img className="patient-avatar" src={url} alt="Patient" />
                    <li className="patient-info-li">Name: <span className="exact-information-item">{name}</span></li>
                    <li className="patient-info-li">Surname: <span className="exact-information-item">{surname}</span></li>
                    <li className="patient-info-li">Gender: <span className="exact-information-item">{gender}</span></li>
                    <li className="patient-info-li">Date of brith: <span className="exact-information-item">{dateOfBirth}</span></li>
                    <li className="patient-info-li">Address: <span className="exact-information-item">{address}</span></li>
                    <li className="patient-info-li">Email: <span className="exact-information-item">{email}</span></li>
                    <li className="patient-info-li">Phone: <span className="exact-information-item">{phone}</span></li>
                </ul>
            </div>
        )
    }

    render(){
        const {loading, error} = this.state;
        const adjusted = this.htmlFunc();

        const spinnerComponent = loading ? <Spinner/> : null;
        const errorComponent = 
            error ? 
            <ErrorMessage 
                errorMessage={'Patient card cannot be displayed'} 
                errorPurpose={this.state.errorPurpose}/> 
            : null;

        const content = !(loading||error) ? adjusted : null;


        return(
            <div className='ready-patient-card'>
                {errorComponent}
                {spinnerComponent}
                {content}
            </div>
        );
    }
}

export default PatientCard