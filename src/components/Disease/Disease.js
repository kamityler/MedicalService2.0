import { Component } from "react";

import './Disease.css'

class Disease extends Component{
    constructor(props){
        super(props);
        this.state={
            data: props.data
        }
    }

    render(){
        const {admissionDate, diseaseName, diseaseStatus, dischargeDate, result} = this.state.data;

        const classes = diseaseStatus === 'Active' ? 'disease-block active-disease' : 'disease-block closed-disease';

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
            </div>
        )
    }
}

export default Disease

