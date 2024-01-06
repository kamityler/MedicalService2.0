import {Component} from 'react'
// import axios from 'axios';
import './Vactination.css'
class Vactination extends Component{
    constructor(props){
        super(props);
        this.state = {
            vaccineName: props.vaccineName,
            vaccinationDate: props.vaccinationDate,
            description: props.description,
            doctorName: props.doctorName
        }
    }

    render(){
        const {vaccineName,vaccinationDate,description,doctorName} = this.state

        return(  
            <div className='vaccine-block'>                 
                <div className='block1-row-2-col-1'>
                        <p className="card-field">Назва вакцини: <span className='card-data'>{vaccineName}</span></p>
                        <p className="card-field">Дата вакцинації: <span className='card-data'>{vaccinationDate}</span></p>
                        <p className="card-field">Опис: <span className='card-data'>{description}</span></p>
                        <p className="card-field">Доктор який прописав: <span className='card-data'>{doctorName}</span></p>
                    </div>
             </div> 
        )
    }
}
export default Vactination