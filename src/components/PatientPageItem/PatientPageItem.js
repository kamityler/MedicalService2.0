import { Component } from "react";

import './PatientPageItem.css'

import PatientCard from './../PatientCard/PatientCard';
import RecordList from './../RecordList/RecordList';
import AddRecord from './../AddRecord/AddRecord';

class PatientPageItem extends Component{
    constructor() {
        super();
        this.state = {
            show: false
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
                    <AddRecord show={this.state.show} handleClose={this.hideModal}>
                        <p>Modal</p>
                    </AddRecord>
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