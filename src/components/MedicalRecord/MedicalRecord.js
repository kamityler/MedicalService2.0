import {Component} from 'react'

import './MedicalRecord.css';

class MedicalRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            diagnosis: props.diagnosis,
            date: props.date,
            doctor: props.doctor,
            description: props.description,
            treatment: props.treatment
        }
    }

    render(){
        const {id, diagnosis, date, doctor, description, treatment} = this.state;
        return(
            <li id={id} className='medical-record-item' onClick={this.onClickHandler}>
                {/* <span> Diagnosis: {diagnosis} </span>
                <span> Date of admission: {date}</span>
                <span> Doctor: {doctor}</span>    
                <span> Description: {description}</span>         
                <span> Ways of treatment: {treatment}</span>    */}

                <p className="medical-record-p">Diagnosis: <span>{diagnosis}</span></p>
                <p className="medical-record-p">Date of admission: <span>{date}</span></p> 
                <p className="medical-record-p">Doctor: <span>{doctor}</span></p>
                <p className="medical-record-p">Description: <span>{description}</span></p>
                <p className="medical-record-p">Ways of treatment: <span>{treatment}</span></p>


            </li>
        );
    }
}

export default MedicalRecord