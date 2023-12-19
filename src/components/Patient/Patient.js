import {Component} from 'react'

import './Patient.css';

class Patient extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            photo: props.url,
            name: props.name,
            age: props.age,
            diagnosis: props.diagnosis
        }
    }

    onClickHandler = () => {
        //console.log(`patient id = ${this.state.id} chosen`);
        
    }

    render(){
        const {id, photo, name, age, diagnosis} = this.state;
        const {onGetId} =this.props; 
        return(

                <li id={id} className='patient-item' onClick={onGetId}>
                    <img src={photo} alt="Patient" />
                    <span>{name}</span>
                    <span>{age}</span>
                    <span>{diagnosis}</span>                        
                </li>
            
        );
    }
}

export default Patient