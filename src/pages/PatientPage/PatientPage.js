import {Component} from 'react'

import './PatientPage.css';

class PatientPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            surname: props.surname
        }
    }
    render(){
        const {id, name, surname} = this.state;
        return(
            <p>Patient {id}. {name} {surname} is ill</p>
        );
    }
}

export default PatientPage