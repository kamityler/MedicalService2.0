import {Component} from 'react'

import './Patient.css';

class Patient extends Component{
    constructor(props){
        super(props);
        this.state = {
            photo: props.url,
            name: props.name,
            surname: props.surname,
            age: props.age,
            diagnosis: props.diagnosis
        }
    }

    render(){
        const {photo, name, surname, age, diagnosis} = this.state;
        return(
            <li className='patient-item'>
                <img src={photo} alt="Patient" />
                <span>{name} {surname}</span>
                <span>{age}</span>
                <span>{diagnosis}</span>
            </li>
        );
    }
}

export default Patient