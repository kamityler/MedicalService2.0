import {Component} from 'react'

import './PatientCard.css';

class PatientCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            surname: props.surname,
            dateOfBirth: props.dateOfBirth,
            adress: props.adress,
            email: props.email,
            phone: props.phone,
            description: props.description
        }
    }

    render(){
        const {id, name, surname, dateOfBirth, adress, email, phone, description} = this.state;
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";
        return(
            <div id={id} className="container-patient-card">
                <div className="container-patient-avatar">
                    <img src={url} alt="Patient" />
                </div>
                <ul className="patient-info-ul">
                    <li className="patient-info-li">Name: {name}</li>
                    <li className="patient-info-li">Surname: {surname}</li>
                    <li className="patient-info-li">Date of brith: {dateOfBirth}</li>
                    <li className="patient-info-li">Adress: {adress}</li>
                    <li className="patient-info-li">Email: {email}</li>
                    <li className="patient-info-li">Phone: {phone}</li>
                </ul>
                <p className="patient-medical-info"> {description}</p>
            </div>
        );
    }
}

export default PatientCard