import { Component } from 'react'
import { Link } from 'react-router-dom';
import { CiSquareChevLeft } from "react-icons/ci";


import './MedCard.css'
import './AddRecordModal.css'

import RecordList from './../RecordList/RecordList';
import ModalWindow from './../modalWindow/ModalWindow';

class MedCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
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
                    {/* <button>повернутись до сторінки пацієнта</button> */}
                    <div className='goback-button'>
                        Повернутись до сторінки пацієнта <CiSquareChevLeft stroke-width="1" viewBox="3 -3 24 24" height="1em" ></CiSquareChevLeft>
                    </div>
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
                            <h1 className="modal-header">Додавання запису</h1>

                            <p className="modal-label">Причина запису:</p>
                            <input required placeholder="Причина" type="text" name="reason" className="modal-field modal-input"></input>

                            <p className="modal-label">Обрати приналежність:</p>
                            <input type="text" id="diagnosis-input" list="diagnosis" name="diagnosis" autoComplete='off'/>
                            <datalist id="diagnosis">
                                <option value="Діабет"/>
                                <option value="Рак"/>
                                <option value="Інше"/>    
                            </datalist>

                            {/* onChange={(e) => this.onChangeHandle("diagnosis", e.target.value )} */}
                            <p className="modal-label">Опис:</p>
                            <textarea required placeholder="Введіть опис тут..." name="description" className="modal-field modal-textarea"></textarea>

                            <p className="modal-label">Спосіб лікування:</p>
                            <textarea required placeholder="Введіть спосіб лікування тут..." name="treatment" className="modal-field modal-textarea"></textarea>

                            <div className="form-button-container">
                                <button className="form-button-submit" value="Submit" type="submit" >Додати</button>
                                <div className="between-div-container"></div>
                                <button className="form-button-submit" value="Reset" type="reset" >Скинути</button>
                            </div>
                        </form>
                    </ModalWindow>
            </div>
        );
    }
}

export default MedCard;