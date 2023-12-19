import { Component } from 'react'
import { Link } from 'react-router-dom';
import RecordList from './../RecordList/RecordList';

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
                <Link to={`/patientList/${this.state.id}`}>
                    <button>повернутись до сторінки пацієнта</button>
                </Link>    
                <p>Додати новий запис</p>
                <button>Додати</button>
                <br></br>
                <p>Відфільтрувати по хворобах:</p>
                <button>діабет</button>
                <button>ковід</button>
                <div className="record-list-container">
                    <RecordList id={this.state.id}></RecordList>
                </div>
                <Link to={`/patientList/${this.state.id}`}>
                    <button>повернутись до сторінки пацієнта</button>
                </Link>
            </div>
        );
    }
}

export default MedCard;