import { Component } from 'react'
import { Link } from 'react-router-dom';
import { CiSquareChevLeft } from "react-icons/ci";
import axios from 'axios'

import './MedCard.css'
import './AddRecordModal.css'

import RecordList from './../RecordList/RecordList';
import ModalWindow from './../ModalWindow/ModalWindow';

class MedCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            id: window.location.href.toString().split('/')[4],
            diseasesActive: [],
            diseasesAll: [],
            filter: null,
            shouldUpdate: true,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount(){
        this.getPatientsDiseases();
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

    getPatientsDiseases = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/Disease/${this.state.id}`)
             .then(response => {
                let diseasesActive = new Set(),
                    diseasesAll = new Set();
                response.data.forEach(i => {
                    if(i.diseaseStatus === 'Closed'){
                        diseasesAll.add(i.diseaseName);
                    } else {
                        diseasesActive.add(i.diseaseName);
                        diseasesAll.add(i.diseaseName);
                    }
                })
                this.setState({
                    diseasesActive: [...diseasesActive],
                    diseasesAll: [...diseasesAll]})
             })
             .catch(err => console.log(err))
    }

    onSortButtonClick = (e) => {
        this.setState({
            filter: e.target.value,
            shouldComponent: false,
        })
    }

    formSortButtonList = (arr) => {
        const items = arr.map((item, index) => {
            return (
                <button key={index+1} value={item} onClick={this.onSortButtonClick}>
                    {item}
                </button>
            )
        })

        return (
            <div className="button-list">
                <button key={0} value={null} onClick={this.onSortButtonClick}>
                    Всі записи
                </button>
                {items}
            </div>
        )
    }

    formSortOptionsList = (arr) => {
        const items = arr.map((item, index) => {
            return (
                <option key={index} value={item} />
            )
        })

        return (
            <datalist id="diagnosis">
                {items}
            </datalist>
        )
    }

    render(){
        const buttonsAllForSort = this.formSortButtonList(this.state.diseasesAll),
              buttonsActiveForSort = this.formSortButtonList(this.state.diseasesActive),
              optionsForAdd = this.formSortOptionsList(this.state.diseasesActive);
        
        return(
            <div className='record-list'>
                <Link to={`/patientList/${this.state.id}`}>
                    <button>
                    {/* <div className='goback-button'> */}
                        Повернутись до сторінки пацієнта <CiSquareChevLeft strokeWidth="1" viewBox="3 -3 24 24" height="1em" ></CiSquareChevLeft>
                    {/* </div> */}
                    </button>
                </Link>
                <h1>Щоденник записів</h1>
                <div className='filter-block'>
                    <p>Додати новий запис</p>
                    <button onClick={this.showModal}>Додати</button>
                </div>
                <br></br>
                <div className='filter-block'>
                    <p>Відфільтрувати по хворобах:</p>
                        {buttonsAllForSort}
                    <p>Відфільтрувати по активних хворобах:</p>
                        {buttonsActiveForSort}
                </div>
                <div className="record-list-container">

                    <p>Список записів:</p>
                    <p>Встановлений фільтр: {this.state.filter}</p>
                    <RecordList itemsperPage={8} id={this.state.id} filter={this.state.filter} shouldUpdate={this.state.shouldUpdate}></RecordList>
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
                            {optionsForAdd}
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