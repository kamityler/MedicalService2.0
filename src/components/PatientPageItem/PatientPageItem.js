import { Component } from "react";
import axios from 'axios';

import './PatientPageItem.css'

import PatientCard from './../PatientCard/PatientCard';
import RecordList from './../RecordList/RecordList';
import ModalWindow from './../modalWindow/ModalWindow'
class PatientPageItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
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

    onChangeHandle = (name, value) =>{
        this.setState(prevState => {
            let medicalRecord = Object.assign({}, prevState.medicalRecord);
            medicalRecord[name] = value
            return {medicalRecord};
        })
    }

    addRecord = (e) => {
        e.preventDefault();
        
        axios.post(
            `https://localhost:5001/api/MedicalRecords/${this.state.patientID}/Appointments`,
            this.state.medicalRecord,
            { headers: { 
                "Access-Control-Allow-Origin": "*"
            } } )
            .then(response => console.log(response))
            .catch(err => { console.log(err); })

        this.hideModal();
    }

    recordList = (patientID) => {
        return (           
        <div className="record-list-container">
            <RecordList id={patientID} itemsperPage={8}></RecordList>
        </div>)        
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render(){
        
        const {patientID} = this.props;
        const records = this.recordList(patientID);
        return(
            <div className="medical-card-page">
                <div className="patient-card-container"> 
                    <PatientCard id={patientID}/> 
                    <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                        <form className="modal-form" onSubmit={this.addRecord}>
                            <h1 className="modal-header">Додати новий запис</h1>
                            <p className="modal-label">Введіть діагноз:</p>
                            <input required placeholder="Diagnosis" type="text" onChange={(e) => this.onChangeHandle("diagnosis", e.target.value )} name="diagnosis" className="modal-field modal-input"></input>
                            <p className="modal-label">Додайте опис:</p>
                            <textarea required placeholder="Enter description here..." onChange={(e) => this.onChangeHandle("description", e.target.value )} name="description" className="modal-field modal-textarea"></textarea>
                            <p className="modal-label">Введіть шлях лікування:</p>
                            <textarea required placeholder="Enter treatment here..." onChange={(e) => this.onChangeHandle("treatment", e.target.value )} name="treatment" className="modal-field modal-textarea"></textarea>
                            <div className="form-button-container">
                                <button className="form-button-submit" value="Submit" type="submit" >Підтвердити</button>
                                <div className="between-div-container"></div>
                                <input className="form-button-submit" type="reset" value="Reset"/>
                            </div>
                        </form>
                    </ModalWindow>
                    <button className="add-form-button" type="button" onClick={this.showModal}>Додати новий зартс</button>
                </div>
                {records}

            </div>
        );
    }
}

export default PatientPageItem;