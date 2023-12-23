import {Component} from 'react'
import axios from 'axios';

import './VactinationList.css'

import Vactination from '../Vactination/Vactination';
import ModalWindow from '../ModalWindow/ModalWindow';

class VactinationList extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            itemsperPage: this.props.itemsperPage,
            records: [],
            loading: true,
            error: false,
            newRecordLoading: false,
            filter: props.filter,
            currentPage:1,
            rerender: false,
            show: false
        }
    }
    componentDidMount() {
        setTimeout(()=>{this.onRequest()},2000);
        console.log(this.state.id);
    }
    onRequest = () => {
        this.onRecordsListLoading();
        //${this.state.id}
        axios.get(`https://localhost:5001/api/MedicalRecords/Vactinations/${this.state.id}`)
             .then(response => {
                return response;
             })
             .then(response => response.data.map(this.transformRecords))
            //  .then(array => array.filter(this.filterRecords))
             .then(res => this.onRecordsListLoaded(res))
             .catch((er)=>{console.log(er)});
    }
    transformRecords = (record) => {
        return {
            vaccinationId: record.vaccinationId,
            vaccineName: record.vaccineName,
            vaccinationDate: record.vaccinationDate,
            description: record.description,
            doctorName: record.doctorName,
        }
    }
    onRecordsListLoading = () => {
        this.setState({
            newRecordLoading: true
        })
    }
    onRecordsListLoaded = (newRecordsList) => {
        const newarr = newRecordsList.reverse();
        this.setState(({records})=>({
            records: [...records, ...newarr],
            loading: false,
            newRecordLoading: false
        }))
        console.log(newRecordsList);
    }
     extractDate(inputString) {
        // Створюємо об'єкт Date і передаємо в нього рядок з датою
        const dateObject = inputString;
    
        // Отримуємо рік, місяць і день
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1, оскільки місяці в Date починаються з 0
        const day = dateObject.getDate().toString().padStart(2, '0');
    
        // Складаємо рядок у форматі "YYYY-MM-DD"
        const result = `${year}-${month}-${day}`;
    
        return result;
    }
    onVactineAdd = (e) => {
        e.preventDefault();
        
        this.hideModal();
        const vaccineName = document.querySelector('#vacineName').value;
        const vaccineDescriprion = document.querySelector('#vacineDescriptiom').value;
        const newVaccine = {
            patientID: this.state.id,
            vaccineName: vaccineName,
            vaccinationDate: this.extractDate(new Date()),
            description: vaccineDescriprion,
            doctorName: localStorage.getItem('doctorName'),
          }
        axios.post(
                `https://localhost:5001/api/MedicalRecords/Vactinations/${this.state.id}`,
                newVaccine, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                })
            .then(response => response.data)
            .then(newVaccine => {
                let newRecords = this.state.records;
                newRecords = [...this.state.records, newVaccine]
                this.setState({
                    records: newRecords
                })
                
            })
            // .then((newDiagnosis) => {
            //     const doctorID = localStorage.getItem('id');
            //     axios.get(`https://localhost:5001/api/MedicalRecords/Doctor/${doctorID}`)
            //         .then(response => response.data)
            //         .then((doctor) => {

            //             const openingRecordobj = {
            //                 appointmentID: 0,
            //                 patientID: this.state.patient.id,
            //                 doctorID: doctor.doctorID,
            //                 diagnosis: "Початок лікування",
            //                 appointmentDate: new Date(),
            //                 type: newDiagnosis.diseaseName,
            //                 doctor: doctor.lastName + ' ' + doctor.firstName,
            //                 description: "Пацієнтові поставлено новий діагноз, взято на облік.",
            //                 treatment: null

            //             }
            //             console.log(openingRecordobj);
            //             console.log(newDiagnosis.diseaseName)
            //             axios.post(
            //                     `https://localhost:5001/api/MedicalRecords/${newDiagnosis.patientID}/Appointments`,
            //                     openingRecordobj, {
            //                         headers: {
            //                             "Access-Control-Allow-Origin": "*"
            //                         }
            //                     })
            //                 .then(response => console.log(response))
            //                 .catch(err => console.log(err))
            //         })
            //         .catch(err => console.log(err))
            // })
            .catch(err => console.log(err))

        }

    adjustItems = (arr)=> {
        const items = arr.map((item)=>{
            return (
                    <Vactination  
                    key={item.id}
                    id={item.id} 
                        vaccineName={item.vaccineName} 
                        vaccinationDate={item.vaccinationDate}
                        description={item.description}
                        doctorName={item.doctorName}
                    >
                    </Vactination>
            )
        })
        return(
            <ul className="record-list">
                {items}    
            </ul> 
        ) 
    }
    onAddVactinationClick=()=>{
        this.setState({show:true});
    
    }
    hideModal=()=>{
        this.setState({show:false});
    }
    render(){
        const {records} = this.state;
        const content = this.adjustItems(records);

        return(  
        <div>
           {content}
           <button onClick={this.onAddVactinationClick}className="endDiseaseButton add-button-width">Додати інформацію про щеплення</button>
           <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                    <form className="modal-form" onSubmit={this.onVactineAdd}>
                            <h1 className="modal-header">Інформація про щеплення</h1>
                            <p className="modal-label" >Назва вакцини:</p>
                            <input type="text"id="vacineName" name="name" className="Name" placeholder='Назва вакцини' required></input>
                            <p className="modal-label">Опис:</p>
                            <input type="text" id="vacineDescriptiom" name="name" className="Name" placeholder='Опис' required></input>
                            <button className="form-button-submit" id="vacineDescriprion" value="Submit" type="submit" >Додати діагноз</button>
                        </form>
            </ModalWindow>
        </div>
        )
    }
}
export default VactinationList