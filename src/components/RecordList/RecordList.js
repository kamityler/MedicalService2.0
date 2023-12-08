import {Component} from 'react'
import axios from 'axios';

import MedicalRecord from './../MedicalRecord/MedicalRecord';


import './RecordList.css';

class RecordList extends Component{
    state = {
        patientList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        patientEnded: false
    }

    componentDidMount() {
        //this.onRequest();
    }

    onRequest = () => {
        this.onPatientListLoading();
        axios.get('https://localhost:5001/api/MedicalRecords/')
            //  .then(res => console.log(res.data))
             .then(response => response.data.map(this.transformPatient))
             .then(res => this.onPatientListLoaded(res));

    }

    transformPatient = (patient) => {
        const birth = new Date(patient.dateOfBirth);
        let age = new Date().getFullYear() - birth.getFullYear();
        return {
            id: patient.patientID,
            name: patient.firstName,
            surname: patient.lastName,
            date: age,
            diagnosis: patient.previousIllnesses
        }
    }


    onPatientListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onPatientListLoaded = (newPatientList) => {
        let ended = false;
        
        if(newPatientList.length < 10){
            ended = true;
        }

        this.setState(({patientList})=>({
            patientList: [...patientList, ...newPatientList],
            loading: false,
            newItemLoading: false,
            patientEnded: ended
        }))
    }

    adjustItems(arr) {
        
    }


    render(){ 
        return(
            <div className="container-record-list">
                <div className="container-content">
                    <ul className='record-list'>
                        <MedicalRecord id={1} 
                                       doctor={'Dr. Carlos Martinez, Endocrinologist'} 
                                       diagnosis={'Chronic Respiratory Condition (CRC)'}
                                       date={'April 15, 2023'}
                                       description={'John Doe, a 45-year-old male, presented with persistent cough, shortness of breath, and chest tightness. After a series of diagnostic tests, including spirometry and imaging studies, Dr. Rodriguez diagnosed him with a Chronic Respiratory Condition (CRC). Further examination revealed that John had a history of smoking and occupational exposure to dust and pollutants.'}
                                       treatment={'Medication: Long-acting bronchodilators to help open the airways. Inhaled corticosteroids to reduce inflammation in the lungs. Antibiotics if there is a bacterial infection. Lifestyle Changes: Smoking cessation counseling and support. Occupational changes to minimize exposure to respiratory irritants. Regular exercise to improve lung function.'}
                                       >
                        </MedicalRecord>

                        <MedicalRecord id={2} 
                                       doctor={'Dr. Emily Rodriguez, Pulmonologist'} 
                                       diagnosis={'Type 2 Diabetes Mellitus'}
                                       date={'June 3, 2023'}
                                       description={'Patient presented with excessive thirst, frequent urination, and unexplained weight loss. Dr. Martinez conducted blood tests and diagnosed Maria with Type 2 Diabetes Mellitus. Further investigation revealed poor dietary habits and a sedentary lifestyle as contributing factors.'}
                                       treatment={'Oral antidiabetic medications to regulate blood sugar levels. Insulin therapy if necessary.'}
                                       >
                        </MedicalRecord>

                        <MedicalRecord id={3} 
                                       doctor={'Dr. Michael Johnson, Rheumatologist'} 
                                       diagnosis={'Rheumatoid Arthritis'}
                                       date={'September 20, 2023'}
                                       description={'John Doe, a 45-year-old male, reported joint pain, stiffness, and swelling in multiple joints. Dr. Johnson diagnosed her with Rheumatoid Arthritis, an autoimmune disorder affecting the joints. Further evaluation revealed a family history of autoimmune diseases.'}
                                       treatment={'Disease-modifying antirheumatic drugs (DMARDs) to slow down the progression of the disease.v Nonsteroidal anti-inflammatory drugs (NSAIDs) for pain and inflammation control.'}
                                       >
                        </MedicalRecord>

                    </ul>
                </div>

            </div>

        );
    }
}

export default RecordList