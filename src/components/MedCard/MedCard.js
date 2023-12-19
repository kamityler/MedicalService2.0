import { Component } from 'react'
import { Link } from 'react-router-dom';

class MedCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: window.location.href.toString().split('/')[4]
        }
    }

    render(){
        return(
            <div className='record-list'>
                this is medcard
                <Link to={`/patientList/${this.state.id}`}>
                    <button>records</button>
                </Link>
            </div>
        );
    }
}

export default MedCard;