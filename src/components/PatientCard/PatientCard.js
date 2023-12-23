import { Component } from 'react'
import axios from 'axios';

import './PatientCard.css';

// import Spinner from './../basicComponents/spinner/Spinner';
// import ErrorMessage from './../basicComponents/errorMessage/ErrorMessage';
import Disease from '../Disease/Disease';
import ModalWindow from './../modalWindow/ModalWindow';
import { List } from '@mui/material';
import VactinationList from '../VactinationList/VactinationList';

class PatientCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
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
                privilegeNumber: null,
                diseases: []
            },
            loading: true,
            error: false,
            errorPurpose: 'unknown'
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        this.onRequest();       
    }

    onRequest = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.patient.id}`)
            .then(response => this.transformPatient(response.data))
            .then(result => this.onPatientInfoLoaded(result))
            .catch(this.onError);
    }

    date = (item) => (new Date(item)).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    
    transformPatient = (response) => {
        const date = (item) => (new Date(item)).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })

        const disease = response.diseases ? [...response.diseases] : [];
        return ({
            id: response.patientID,
            completionDate: date(response.completionDate),
            name: response.firstName,
            middlename: response.middlename,
            surname: response.lastName,
            gender: response.gender,
            dateOfBirth: date(response.dateOfBirth),
            phone: response.phoneNumber,
            email: response.email,
            address: response.address,
            work: response.workplace,
            position: response.position,
            groupDispensary: response.groupDispensary,
            contingents: response.contingents,
            privilegeNumber: response.privilegeNumber,
            diseases: disease,
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

    diseasesList = (arr) => {
        if (!arr.length || arr === null) {
            return 'Список порожній';
        } else {
            const diseases = arr.map(item => {
                return (<Disease key={item.diseaseID} data={item}></Disease>)
            })
            return diseases;
        }
    }

    onDiseaseAdd = (e) => {
        e.preventDefault();
        
        this.hideModal();
        const newDisease = {
            patientID: this.state.patient.id,
            diseaseStatus: "Active",
            diseaseName: e.target.name.value,
            admissionDate: this.date(new Date()),
            dischargeDate: null,
            result: null
          }
        axios.post(
                `https://localhost:5001/api/MedicalRecords/Disease/${this.state.patient.id}`,
                newDisease, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                })
            .then(response => response.data)
            .then(newDiagnosis => {
                let newPatient = this.state.patient;
                newPatient.diseases = [...this.state.patient.diseases, newDiagnosis]
                this.setState({
                    patient: newPatient
                })
                return newDiagnosis
            })
            .then((newDiagnosis) => {
                const doctorID = localStorage.getItem('id');
                axios.get(`https://localhost:5001/api/MedicalRecords/Doctor/${doctorID}`)
                    .then(response => response.data)
                    .then((doctor) => {

                        const openingRecordobj = {
                            appointmentID: 0,
                            patientID: this.state.patient.id,
                            doctorID: doctor.doctorID,
                            diagnosis: "Початок лікування",
                            appointmentDate: new Date(),
                            type: newDiagnosis.diseaseName,
                            doctor: doctor.lastName + ' ' + doctor.firstName,
                            description: "Пацієнтові поставлено новий діагноз, взято на облік.",
                            treatment: null

                        }
                        console.log(openingRecordobj);
                        console.log(newDiagnosis.diseaseName)
                        axios.post(
                                `https://localhost:5001/api/MedicalRecords/${newDiagnosis.patientID}/Appointments`,
                                openingRecordobj, {
                                    headers: {
                                        "Access-Control-Allow-Origin": "*"
                                    }
                                })
                            .then(response => console.log(response))
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    addVactination = (data)=>{
        return <VactinationList id={this.state.patient.id}></VactinationList>
    }

    onClick = () =>{

    }

    htmlFunc = () => {
        const { id, completionDate, name, middlename, surname, gender, dateOfBirth, phone, email, address, work, position, groupDispensary, contingents, privilegeNumber } = this.state.patient;

        let patientCode = '';
        for (let zeros = 6 - id.toString().length; zeros > 0; zeros--) {
            patientCode += '0';
        }
        patientCode += id

        let workHtml = work ? work + ', ' + position : 'Безробітний';

        const diseases = this.diseasesList(this.state.patient.diseases);

        return(
            <div className="patient-card">
                <h1 className="card-header">Медична карта амбулаторного хворого №25{patientCode}</h1>

                <div className="patient-card-block">
                    <p className="card-field block1-row-1-col-1">Код хворого: <span className='card-data'>{patientCode}</span></p>
                    <p className="card-field block1-row-1-col-2 left-aligned-text"> Дата заповнення: <span className='card-data'>{completionDate}</span></p>
                    <div className='block1-row-2-col-1'>
                        <p className="card-field">Прізвище: <span className='card-data'>{surname}</span></p>
                        <p className="card-field">Ім'я: <span className='card-data'>{name}</span></p>
                        <p className="card-field">По батькові: <span className='card-data'>{middlename}</span></p>
                        <p className="card-field">Стать: <span className='card-data'>{gender}</span></p>
                        <p className="card-field">Дата народження: <span className='card-data'>{dateOfBirth}</span></p>
                    </div>
                    <div className='block1-row-2-col-2'>
                        <p className="card-field left-aligned-text">Телефон: <span className='card-data'>{phone}</span></p>
                        <p className="card-field left-aligned-text">Електрона адреса: <span className='card-data'>{email}</span> </p>
                        <p className="card-field left-aligned-text">Місце проживання: <span className='card-data'>{address}</span> </p>
                        <p className="card-field left-aligned-text">Місце роботи, посада: <span className='card-data'>{workHtml}</span> </p>                    
                    </div>
                    <div className='block1-row-3'>
                        <p className="card-field">Диспансерна група: <span className='card-data'>{groupDispensary ? 'Так' : 'Ні'}</span></p>
                        <p className="card-field">Контингенти: <span className='card-data'>{contingents === null ? 'Відсутні' : contingents}</span></p>
                        <p className="card-field">Номер пільгового посвідчення: <span className='card-data'>{privilegeNumber  === null ? 'Відсутній' : privilegeNumber}</span></p>
                    </div>
                </div>
                <div className="patient-card-block">
                    <h3 className="card-topic">Хвороби</h3>
                    <List key={Date.now()}>
                       {diseases} 
                    </List>
                    <button className="form-button-addDisease" onClick={this.showModal}>Додати хворобу</button>
                </div>
                <div className="patient-card-block">
                    
                    {this.addVactination()}
                </div>
                <div className="patient-card-block">
                    <h3 className="card-topic">Інформація про страхування</h3>
                    <p className="card-field">Застрахований до <span className='card-data'>27.06.2025</span></p>

                </div>
                <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                    <form className="modal-form" onSubmit={this.onDiseaseAdd}>
                            <h1 className="modal-header">Прийняття на облік</h1>
                            <p className="modal-label">Діагноз:</p>
                            <input type="text" name="name" className="Name" placeholder='Введіть діагноз' required></input>
                            <button className="form-button-submit" value="Submit" type="submit" >Додати діагноз</button>
                        </form>
                </ModalWindow>
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

        return(
            <div>
                {/* {errorComponent}
                {spinnerComponent}
                {content} */}
                {adjusted}
            </div>
        );
    }
}

export default PatientCard