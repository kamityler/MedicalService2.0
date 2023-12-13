import { Component } from "react";

import './PatientPageItem.css'

import PatientCard from './../PatientCard/PatientCard';
import RecordList from './../RecordList/RecordList';

class PatientPageItem extends Component{


    render(){
        const {patientID} = this.props;
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
}

export default PatientPageItem;