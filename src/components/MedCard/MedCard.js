import { Component } from 'react'
import { Link } from 'react-router-dom';
import RecordList from './../RecordList/RecordList';
import ModalWindow from './../ModalWindow/ModalWindow';

class MedCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: window.location.href.toString().split('/')[4]
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    addRecord = (e) => {
        e.preventDefault();
        console.log('record added')
        this.hideModal();
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render(){
        return(
            <div className='record-list'>
                <Link to={`/patientList/${this.state.id}`}>
                    <button>повернутись до сторінки пацієнта</button>
                </Link>
                <div className='filter-block'>
                    <p>Додати новий запис</p>
                    <button onClick={this.showModal}>Додати</button>
                </div>
                <br></br>
                <div className='filter-block'>
                    <p>Відфільтрувати по хворобах:</p>
                    <button>діабет</button>
                    <button>ковід</button>
                </div>
                <div className="record-list-container">
                    <RecordList id={this.state.id}></RecordList>
                </div>
                <Link to={`/patientList/${this.state.id}`}>
                    <button>повернутись до сторінки пацієнта</button>
                </Link>


                <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                        <form className="modal-form" onSubmit={this.addRecord}>
                            <h1 className="modal-header">Add new medical record</h1>
                            <p className="modal-label">Enter diagnosis here:</p>
                            <input required placeholder="Diagnosis" type="text" name="diagnosis" className="modal-field modal-input"></input>
                            {/* onChange={(e) => this.onChangeHandle("diagnosis", e.target.value )} */}
                            <p className="modal-label">Enter description here:</p>
                            <textarea required placeholder="Enter description here..." name="description" className="modal-field modal-textarea"></textarea>
                            <p className="modal-label">Enter ways of treatment here:</p>
                            <textarea required placeholder="Enter treatment here..." name="treatment" className="modal-field modal-textarea"></textarea>
                            <div className="form-button-container">
                                <button className="form-button-submit" value="Submit" type="submit" >Submit</button>
                                <div className="between-div-container"></div>
                                <input className="form-button-submit" type="reset" value="Reset"/>
                            </div>
                        </form>
                    </ModalWindow>
            </div>
        );
    }
}

export default MedCard;