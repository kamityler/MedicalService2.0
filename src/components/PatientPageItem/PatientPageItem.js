import { Component } from "react";

import './PatientPageItem.css'

import PatientCard from './../PatientCard/PatientCard';
import RecordList from './../RecordList/RecordList';
import ModalWindow from './../ModalWindow/ModalWindow';

class PatientPageItem extends Component{
    constructor() {
        super();
        this.state = {
            show: true
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
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
                        <form className="modal-form">
                            <h1 className="modal-header">Add new medical record</h1>
                            <p className="modal-label">Enter diagnosis here:</p>
                            <input required placeholder="Diagnosis" type="text" name="diagnosis" className="modal-field modal-input"></input>
                            <p className="modal-label">Enter description here:</p>
                            <textarea required placeholder="Enter description here..." name="description" className="modal-field modal-textarea"></textarea>
                            <p className="modal-label">Enter ways of treatment here:</p>
                            <textarea required placeholder="Enter treatment here..." name="treatment" className="modal-field modal-textarea"></textarea>
                            <div className="form-button-container">
                                <input className="form-button-submit" type="submit" value="Submit"/>
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