import {Component} from 'react'

import './Patient.css';

class Patient extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            key: props.key,
            photo: props.url,
            name: props.name,
            surname: props.surname,
            age: props.age,
            diagnosis: props.diagnosis
        }
    }

    onClickHandler = () => {
        console.log(`patient id = ${this.state.id} chosen`);
    }

    render(){
        const {id, photo, name, surname, age, diagnosis} = this.state;
        return(

                <li id={id} className='patient-item' onClick={this.onClickHandler}>
                    <img src={photo} alt="Patient" />
                    <span>{name} {surname}</span>
                    <span>{age}</span>
                    <span>{diagnosis}</span>                        
                </li>
            
        );
    }
}

export default Patient