import { Component } from "react";
import axios from 'axios';

import './PatientPageItem.css'

import PatientCard from './../PatientCard/PatientCard';
import RecordList from './../RecordList/RecordList';
import ModalWindow from './../ModalWindow/ModalWindow';

class PatientPageItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            medicalRecord: {
                patientID: this.props.patientID,
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

    addRecord = (e) => {
        e.preventDefault();
        axios.post(
            `https://localhost:5001/api/MedicalRecords/${55}/Appointments`,
            // headers: { 'Content-Type': 'application/json' },
            {data : this.state.medicalRecord}
        ).then(response => console.log(response)).catch(err => console.log(err))
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
                            <input required placeholder="Diagnosis" type="text" name="diagnosis" className="modal-field modal-input"></input>
                            <p className="modal-label">Enter description here:</p>
                            <textarea required placeholder="Enter description here..." name="description" className="modal-field modal-textarea"></textarea>
                            <p className="modal-label">Enter ways of treatment here:</p>
                            <textarea required placeholder="Enter treatment here..." name="treatment" className="modal-field modal-textarea"></textarea>
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