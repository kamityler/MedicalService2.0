import { Component } from "react";
import axios from "axios";

import './Disease.css'

class Disease extends Component{
    constructor(props){
        super(props);
        this.state={
            data: props.data
        }
    }

    date = (item) => (new Date(item)).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    onClosed = () => {
        axios.put(`https://localhost:5001/api/MedicalRecords/Disease/${this.state.data.diseaseID}`,
        {
            diseaseStatus: "Closed",
            dischargeDate: this.date(new Date()),
            result: "Вилікуваний"
        })
    }

    render(){
        const {admissionDate, diseaseName, diseaseStatus, dischargeDate, result} = this.state.data;

        const classes = diseaseStatus === 'Active' ? 'disease-block active-disease' : 'disease-block closed-disease';

        const closeButton = diseaseStatus === 'Active' ? <button onClick={this.onClosed}>Завершити лікування</button> : null;

        return(                    
            <div className={classes}>
                <div className="disease-upper-block">
                    <p className="card-field">Взятий на облік <span className='card-data'>{admissionDate}</span></p>
                    <p className="card-field">Причина <span className='card-data'>{diseaseName}</span></p>
                </div>
                <div className="disease-lower-block">
                    <p className="card-field">Знятий з обліку <span className='card-data'>{diseaseStatus === 'Active' ? 'Ні' : dischargeDate}</span></p>
                    <p className="card-field">Причина <span className='card-data'>{diseaseStatus === 'Active' ? 'В процесі лікування' : result}</span></p>
                </div>
                {closeButton}
            </div>
        )
    }
}

export default Disease

