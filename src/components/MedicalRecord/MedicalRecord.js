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
            treatment: props.treatment,
            patient: props.patient,
            type: props.type
        }
    }

    render(){
        let {id, diagnosis, date, doctor,patient, description, treatment, type} = this.state;
        const patientOrDoctor = (doctor===undefined)? 'Піцієнт' : 'Доктор'
        doctor = (doctor===undefined)? patient : doctor
        return(
            <li id={id} className='medical-record-item' onClick={this.onClickHandler}>
                {/* <span> Diagnosis: {diagnosis} </span>
                <span> Date of admission: {date}</span>
                <span> Doctor: {doctor}</span>    
                <span> Description: {description}</span>         
                <span> Ways of treatment: {treatment}</span>    */}

                <p className="medical-record-p">Що відбулось: <span>{diagnosis}</span></p>
                <p className="medical-record-p">Тип призначення <span>{type ? type : 'Загальне'}</span></p> 
                <p className="medical-record-p">Дата: <span>{date}</span></p> 
                <p className="medical-record-p">{patientOrDoctor}: <span>{doctor}</span></p>
                <p className="medical-record-p">Опис: <span>{description}</span></p>

                {treatment ? <p className="medical-record-p">Рецепт: <span>{treatment}</span></p> : null}
                


            </li>
        );
    }
}

export default MedicalRecord