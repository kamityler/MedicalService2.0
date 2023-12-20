import {Component} from 'react'
import axios from 'axios';

import './PatientCard.css';

// import Spinner from './../basicComponents/spinner/Spinner';
// import ErrorMessage from './../basicComponents/errorMessage/ErrorMessage';

class PatientCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            patient: {
                id: props.id,
                name: 'name',
                surname: 'surname',
                gender: 'gender',
                dateOfBirth: 'dateOfBirth',
                address: 'address',
                email: 'email',
                phone: 'phone',
                // description: 'description'
            },
            loading: true,
            error: false,
            errorPurpose: 'unknown'
        }
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.patient.id}`)
            //  .then(response=>console.log(response.data))
             .then(response => this.transformPatient(response.data))
             .then(result => this.onPatientInfoLoaded(result))
             .catch(this.onError);
    }

    transformPatient = (response) => {
        const date = (item) => {
            const dateArr = item.split("-")
            return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
        }

        return({
            name: response.firstName,
            surname: response.lastName,
            gender: response.gender,
            dateOfBirth: date(response.dateOfBirth),
            address: response.address,
            email: response.email,
            phone: response.phoneNumber,
        })
    }

    onPatientInfoLoaded = (info) => {
        this.setState(()=>({
            patient: info,
            loading: false
        }))        
    }

    onError = (errorBody) => {
        this.setState({
            error: true,
            loading: false,
            errorPurpose: errorBody.message
        })
    }

    htmlFunc = () => {
        const {name, surname, dateOfBirth, address, email, phone, gender} = this.state.patient
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";
        
        return(
                <ul className="patient-info-ul">
                    <img className="patient-avatar" src={url} alt="Patient" />
                    <li className="patient-info-li">Name: <span className="exact-information-item">{name}</span></li>
                    <li className="patient-info-li">Surname: <span className="exact-information-item">{surname}</span></li>
                    <li className="patient-info-li">Gender: <span className="exact-information-item">{gender}</span></li>
                    <li className="patient-info-li">Date of brith: <span className="exact-information-item">{dateOfBirth}</span></li>
                    <li className="patient-info-li">Address: <span className="exact-information-item">{address}</span></li>
                    <li className="patient-info-li">Email: <span className="exact-information-item">{email}</span></li>
                    <li className="patient-info-li">Phone: <span className="exact-information-item">{phone}</span></li>
                </ul>
        )
    }

    render(){
        // const {loading, error} = this.state;
        // const adjusted = this.htmlFunc();
        
        // const spinnerComponent = loading ? <Spinner/> : null;
        // const errorComponent = 
        //     error ? 
        //     <ErrorMessage 
        //         errorMessage={'Patient card cannot be displayed'} 
        //         errorPurpose={this.state.errorPurpose}/> 
        //     : null;

        // const content = !(loading||error) ? adjusted : null;
        // const {id} = this.state.patient;

        return(
            // <div className='ready-patient-card'>
            //     <div id={id} className="patient-card">
            //         {errorComponent}
            //         {spinnerComponent}
            //         {content}
            //     </div>
            // </div>
            <div className="patient-card">
                <h1 className="card-header">Медична карта амбулаторного хворого №250</h1>

                <div className="patient-card-block">
                    <p className="card-field block1-row-1-col-1">Код хворого: <span className='card-data'>123456</span></p>
                    <p className="card-field block1-row-1-col-2 left-aligned-text"><span className='card-data'>{(new Date()).toLocaleDateString().toString()}</span> дата заповнення</p>
                    <div className='block1-row-2-col-1'>
                        <p className="card-field">Прізвище: <span className='card-data'>Фоменко</span></p>
                        <p className="card-field">Ім'я: <span className='card-data'>Андрій</span></p>
                        <p className="card-field">По батькові: <span className='card-data'>Вікторович</span></p>
                    </div>
                    <div className='block1-row-2-col-2'>
                        <p className="card-field left-aligned-text"><span className='card-data'>+380 98 765 4321</span> телефон</p>
                        <p className="card-field left-aligned-text"><span className='card-data'>м. Львів, Україна</span> місце проживання</p>
                        <p className="card-field left-aligned-text"><span className='card-data'>НУЛП, викладач</span> місце роботи, посада</p>                    
                    </div>
                    <div className='block1-row-3'>
                        <p className="card-field">Диспансерна група: <span className='card-data'>Так</span></p>
                        <p className="card-field">Контингенти: <span className='card-data'>УБД, ліквідатор наслідків ЧАЕС</span></p>
                        <p className="card-field">Номер пільгового посвідчення: <span className='card-data'>123456</span></p>
                    </div>
                </div>
                <div className="patient-card-block">
                    <h3 className="card-topic">Хвороби</h3>
                    <p className="card-field">Взятий на облік <span className='card-data'>22.08.2021</span></p>
                    <p className="card-field">Причина <span className='card-data'>Ковід</span></p>
                    <p className="card-field">Знятий з обліку <span className='card-data'>18.09.2021</span></p>
                    <p className="card-field">Причина <span className='card-data'>Вілікуваний</span></p>
                    <br></br>
                    <p className="card-field">Взятий на облік <span className='card-data'>22.08.2021</span></p>
                    <p className="card-field">Причина <span className='card-data'>Діабет</span></p>
                    <p className="card-field">Знятий з обліку <span className='card-data'>--.--.----</span></p>
                    <p className="card-field">Причина <span className='card-data'>___________</span></p>
                </div>
                <div className="patient-card-block">
                    <h3 className="card-topic">Інформація про щеплення</h3>
                    <p className="card-field">Стовбняк <span className='card-data'>05.01.2017</span></p>
                    <p className="card-field">Модерна <span className='card-data'>12.07.2021</span></p>
                    <p className="card-field">Модерна <span className='card-data'>16.08.2021</span></p>
                    <p className="card-field">Гепатит <span className='card-data'>24.12.2022</span></p>
                </div>
                <div className="patient-card-block">
                    <h3 className="card-topic">Інформація про страхування</h3>
                    <p className="card-field">Застрахований до <span className='card-data'>27.06.2025</span></p>

                </div>
            </div>
        );
    }
}

export default PatientCard