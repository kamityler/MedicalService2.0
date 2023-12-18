import { Component, useState } from "react";
import axios from 'axios';

import './PatientPageItem.css'

import PatientCard from './../PatientCard/PatientCard';
import RecordList from './../RecordList/RecordList';
import ModalWindow from './../ModalWindow/ModalWindow';

class PatientPageItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            patientID: this.props.patientID,
            medicalRecord: {
                appointmentID: 0,
                diagnosis: 'some diagnosis',
                appointmentDate: new Date(),
                doctor: 'dr.Bodnar',
                description: 'something went wrong',
                treatment: 'two pills in the vessel',
                appointmentType: 'General'
            }
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    adjustRequest = (diagnosis, description, treatment) => {
        console.log(diagnosis,description,treatment)
        let newObj = this.state.medicalRecord;
        newObj = {
            appointmentID: 0,
            diagnosis: diagnosis,
            appointmentDate: new Date(),
            doctor: 'dr.Bodnar',
            description: description,
            treatment: treatment,
            appointmentType: 'General'
        }
        // this.setState(() => ({
        //     medicalRecord: {
        //         diagnosis: {diagnosis},
        //         description: {description},
        //         treatment: {treatment} 
        //     }
        // }))
        

        this.setState(()=>({
            medicalRecord: newObj,
        }))
        this.setState(()=>({
            medicalRecord: newObj,
        }))
        // console.log(this.state.medicalRecord);
        // console.log(newObj);
        return console.log(this.state.medicalRecord)
    }

    addRecord = (e) => {
        e.preventDefault();
        const newObj = {
            appointmentID: 0,
            diagnosis: e.target.diagnosis.value,
            appointmentDate: new Date(),
            doctor: 'dr.Bodnar',
            description: e.target.description.value,
            treatment: e.target.treatment.value,
            appointmentType: 'General'
        }
        
        this.setState(()=>({
            medicalRecord: newObj,
        }))

        this.setState(()=>({
            medicalRecord: newObj,
        }))
        
        console.log(this.state.medicalRecord)

        axios.post(
            `https://localhost:5001/api/MedicalRecords/${this.state.patientID}/Appointments`,
            this.state.medicalRecord,
            { headers: { 
                "Access-Control-Allow-Origin": "*"
            } } )
            // .then(response => console.log(response))
            .catch(err => { console.log(err); })
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render(){
        const {patientID} = this.props;
        return(
            <div className="medical-card-page">
                <div className="patient-card-container"> 
                    <PatientCard id={patientID}/> 
                    <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                        <form className="modal-form" onSubmit={this.addRecord}>
                            <h1 className="modal-header">Add new medical record</h1>
                            <p className="modal-label">Enter diagnosis here:</p>
                            <input required placeholder="Diagnosis" type="text" name="diagnosis" className="modal-field modal-input" defaultValue="something0"></input>
                            <p className="modal-label">Enter description here:</p>
                            <textarea required placeholder="Enter description here..." name="description" className="modal-field modal-textarea" defaultValue="something1"></textarea>
                            <p className="modal-label">Enter ways of treatment here:</p>
                            <textarea required placeholder="Enter treatment here..." name="treatment" className="modal-field modal-textarea" defaultValue="something2"></textarea>
                            <div className="form-button-container">
                                <button className="form-button-submit" value="Submit" type="submit">Submit</button>
                                <div className="between-div-container"></div>
                                <input className="form-button-submit" type="reset" value="Reset"/>
                            </div>
                        </form>
                    </ModalWindow>
                    <button className="add-form-button" type="button" onClick={this.showModal}>Add new record</button>
                </div>
                <div className="record-list-container">
                    <RecordList id={patientID}></RecordList>
                </div>
            </div>
        );
    }
}

export default PatientPageItem;