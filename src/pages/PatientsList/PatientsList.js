import {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

import './PatientsList.css';
import './SearchBar.css'

import Patient from '../../components/Patient/Patient'
import Spinner from '../../components/basicComponents/spinner/Spinner';
import ErrorMessage from '../../components/basicComponents/errorMessage/ErrorMessage';
import SearchPannel from '../../components/basicComponents/searchPannel/SearchPannel';

class PatientList extends Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            patientList: [],
            loading: true,
            error: false,
            newItemLoading: false,
            patientEnded: false,
            doctorId: localStorage.getItem('id'),
            errorPurpose: 'unknown' 
        }
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        this.onPatientListLoading();
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.doctorId}/Patients`)
            //  .then(data=>console.log(data))
             .then(response => response.data.map(this.transformPatient))
             .then(res => this.onPatientListLoaded(res))
             .catch(this.onError);
    }

    onPatientListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    transformPatient = (patient) => {
        const birth = new Date(patient.dateOfBirth);
        console.log(patient)

        let age = new Date().getFullYear() - birth.getFullYear();
        return {
            id: patient.patientID,
            name: patient.firstName + ' ' + patient.lastName,
            age: age,
            diagnosis: patient.previousIllnesses
        }
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

    onError = (errorBody) => {
        this.setState({
            error: true,
            loading: false,
            errorPurpose: errorBody.message
        })
    }

    adjustItems(arr) {
        const items = arr.map((item)=>{
            return (
                <div key={item.id}>
                    <Link to={`/patientList/${item.id}`}>
                        <Patient                       
                            id={item.id} 
                            url={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"} 
                            name={item.name}
                            age={item.age} 
                            diagnosis={item.diagnosis}
                            >
                        </Patient>
                    </Link>
                </div>

            )
        })

        return(
            <ul className='patient-list'>
                {items}
            </ul>
        )
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    render(){ 
        const {loading, patientList, error, term} = this.state;
        const visibleData = this.searchEmp(patientList, term);
        const adjustedList = this.adjustItems(visibleData);

        const spinnerComponent = loading ? <Spinner/> : null;
        const errorComponent = 
            error ? 
            <ErrorMessage 
                errorMessage={'List cannot be displayed'} 
                errorPurpose={this.state.errorPurpose}/> 
            : null;

        const content = !(loading||error) ? adjustedList : null;

        return(
            <div className="container-patient-list">
                <div className="container-header">
                    <div className="container-header-item image-item"></div>
                    <div className="container-header-item">Name</div>
                    <div className="container-header-item">Age</div>
                    <div className="container-header-item">Diagnosis</div>
                </div>    
                <div className='search-element'>
                    <SearchPannel onUpdateSearch={this.onUpdateSearch}/>
                </div>                 
                <div className="container-content">
                    {errorComponent}
                    {spinnerComponent}
                    {content}
                </div>

            </div>

        );
    }
}

export default PatientList