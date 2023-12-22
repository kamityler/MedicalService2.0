import { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import './MedCard.css'
import './AddRecordModal.css'

import RecordList from './../RecordList/RecordList';
import ModalWindow from './../modalWindow/ModalWindow';

class MedCard extends Component{
    constructor(props){
        super(props); 
        this.state = { 
            show: false, 
            id: window.location.href.toString().split('/')[4],
            diseasesActive: [],
            diseasesAll: [],
            filter: props.filter,
            medicalRecord: {
                diagnosis: 'some diagnosis',
                appointmentDate: new Date(),
                doctorID: localStorage.getItem('id'),
                doctor: localStorage.getItem('id') === 1 ? 'Jones Emily' : 'Oleg Olegovich',
                description: 'something went wrong',
                treatment: 'two pills in the vessel',
                type: 'General',
                date: props.date,
            }
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount(){
        this.getPatientsDiseases();
    }

    addRecord = (e) => {
        e.preventDefault();

        axios.post(
            `https://localhost:5001/api/MedicalRecords/${this.state.id}/Appointments`,
            this.state.medicalRecord,
            { headers: { 
                "Access-Control-Allow-Origin": "*"
            } } )
            .then(response => console.log(response))
            .catch(err => { console.log(err); })

            window.location.reload(false);

            this.hideModal();
    }

    onChangeHandle = (name, value) =>{
        this.setState(prevState => {
            let medicalRecord = Object.assign({}, prevState.medicalRecord);
            medicalRecord[name] = value
            return {medicalRecord};
        })
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
        // window.location.reload(false);

        this.setState({
            filter: e.target.value
        })        
        // window.location.reload(false);

    }
 
    transliterate = (word) => {
        var answer = ""
          , a = {};
       a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
       a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
       a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="A";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
       a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
       a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
       a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";
    
       for (let i in word){
         if (word.hasOwnProperty(i)) {
           if (a[word[i]] === undefined){
             answer += word[i];
           } else {
             answer += a[word[i]];
           }
         }
       }
       return answer;
    }

    formSortButtonList = (arr) => {
        const items = arr.map((item, index) => {
            return (
                <Link to={`/patientList/${this.state.id}/records/${item}`}>
                    <button className="one-sort-button" key={index+1} value={item} onClick={this.onSortButtonClick}>
                        {item}
                    </button>
                </Link>
            )
        })

        return (
            <div className="button-list">
                <button className="one-sort-button" key={0} value={null} onClick={this.onSortButtonClick}>
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
                    <button class="back-button">Повернутись</button>
                </Link>
                <h1 className='page-header'>Щоденник записів</h1>
                <div className='filter-block'>
                    <div className='label-for-button'>Додати новий запис:</div>
                    <button className="add-record-button" onClick={this.showModal}>Додати</button>
                </div>
                <div className='filter-block'>
                    <div className='label-for-button'>Відфільтрувати по хворобах:</div>
                        {buttonsAllForSort}
                    <div className='label-for-button'>Відфільтрувати по активних хворобах:</div>
                        {buttonsActiveForSort}
                </div>   
                <div className="record-list-container">
                    <div className='label-for-button'>Встановлений фільтр: {this.state.filter === null || this.state.filter === "" ? "Відсутній" : this.state.filter}</div>
                    <RecordList key={Date.now()} itemsperPage={8} id={this.state.id} filter={this.state.filter}></RecordList>
                </div>
                <Link to={`/patientList/${this.state.id}`}>
                    <button class="back-button">Повернутись</button>
                </Link>

                <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                        <form className="modal-form" onSubmit={this.addRecord}>
                            <h1 className="modal-header">Додавання запису</h1>
                            <p className="modal-label">Причина запису:</p>
                            <input required placeholder="Причина" type="text" name="reason" onChange={(e) => this.onChangeHandle("diagnosis", e.target.value )} className="modal-field modal-input"></input>
                            <p className="modal-label">Обрати приналежність:</p>
                            <input className="modal-field modal-input" type="text" id="diagnosis-input" list="diagnosis" name="diagnosis" onChange={(e) => this.onChangeHandle("type", e.target.value )} autoComplete='off' placeholder='Оберіть причину'/>
                            {optionsForAdd}
                            {/* onChange={(e) => this.onChangeHandle("diagnosis", e.target.value )} */}
                            <p className="modal-label">Опис:</p>
                            <textarea required placeholder="Введіть опис тут..." name="description" className="modal-field modal-textarea" onChange={(e) => this.onChangeHandle("description", e.target.value )}></textarea>
                            <p className="modal-label">Спосіб лікування:</p>
                            <textarea required placeholder="Введіть спосіб лікування тут..." name="treatment" className="modal-field modal-textarea" onChange={(e) => this.onChangeHandle("treatment", e.target.value )}></textarea>
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