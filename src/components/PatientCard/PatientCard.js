import {Component} from 'react'
import axios from 'axios';

import './PatientCard.css';

// import Spinner from './../basicComponents/spinner/Spinner';
// import ErrorMessage from './../basicComponents/errorMessage/ErrorMessage';

class PatientCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            patient: {
                id: props.id,
                completionDate: 'dd.mm.yyyy',
                name: 'name',
                middlename: 'fathername',
                surname: 'surname',
                gender: 'gender',
                dateOfBirth: 'dateOfBirth',
                phone: 'phone',
                email: 'email',
                address: 'address',
                work: 'work',
                position: 'position',

                groupDispensary: false,
                contingents: null,
                privilegeNumber: null
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
        // const date = (item) => {
        //     const dateArr = item.split("-")
        //     return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
        // }
        const date = (item) => {
            // console.log('item ' + item)
            // console.log(new Date(item)).getLocaleDateString())
            return item
        }

        return({
            id: response.patientID,
            completionDate: date(response.completionDate),
            name: response.firstName,
            middlename: response.middlename,
            surname: response.lastName,
            gender: response.gender,
            dateOfBirth: response.dateOfBirth,
            phone: response.phoneNumber,
            email: response.email,
            address: response.address,
            work: response.workplace,
            position: response.position,

            groupDispensary: response.groupDispensary,
            contingents: response.contingents,
            privilegeNumber: response.privilegeNumber,
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
        const {id, completionDate, name, middlename, surname, gender, dateOfBirth, phone, email, address, work, position, groupDispensary, contingents, privilegeNumber} = this.state.patient;

        let patientCode = '';
        // console.log(this.state.patient)
        for (let zeros = 6 - id.toString().length; zeros > 0; zeros--) {
            patientCode += '0';
        }
        patientCode += id
        
        return(
            <div className="patient-card">
                <h1 className="card-header">Медична карта амбулаторного хворого №250</h1>

                <div className="patient-card-block">
                    <p className="card-field block1-row-1-col-1">Код хворого: <span className='card-data'>{patientCode}</span></p>
                    <p className="card-field block1-row-1-col-2 left-aligned-text"><span className='card-data'>{completionDate}</span> дата заповнення</p>
                    <div className='block1-row-2-col-1'>
                        <p className="card-field">Прізвище: <span className='card-data'>{surname}</span></p>
                        <p className="card-field">Ім'я: <span className='card-data'>{name}</span></p>
                        <p className="card-field">По батькові: <span className='card-data'>{middlename}</span></p>
                        <p className="card-field">Стать: <span className='card-data'>{gender}</span></p>
                        <p className="card-field">Дата народження: <span className='card-data'>{dateOfBirth}</span></p>
                    </div>
                    <div className='block1-row-2-col-2'>
                        <p className="card-field left-aligned-text"><span className='card-data'>{phone}</span> телефон</p>
                        <p className="card-field left-aligned-text"><span className='card-data'>{email}</span> е-пошта</p>
                        <p className="card-field left-aligned-text"><span className='card-data'>{address}</span> місце проживання</p>
                        <p className="card-field left-aligned-text"><span className='card-data'>{work}, {position}</span> місце роботи, посада</p>                    
                    </div>
                    <div className='block1-row-3'>
                        <p className="card-field">Диспансерна група: <span className='card-data'>{groupDispensary ? 'Так' : 'Ні'}</span></p>
                        <p className="card-field">Контингенти: <span className='card-data'>{contingents === null ? 'Відсутні' : contingents}</span></p>
                        <p className="card-field">Номер пільгового посвідчення: <span className='card-data'>{privilegeNumber  === null ? 'Відсутній' : privilegeNumber}</span></p>
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
        )
    }

    render(){
        // const {loading, error} = this.state;
        const adjusted = this.htmlFunc();
        
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
            <div>
             {adjusted}   
            </div>
            
        );
    }
}

export default PatientCard