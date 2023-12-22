import {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

import './PatientsList.css';
import './SearchBar.css'

import Patient from '../../components/Patient/Patient'
import Spinner from '../../components/basicComponents/spinner/Spinner';
import ErrorMessage from '../../components/basicComponents/errorMessage/ErrorMessage';
import SearchPannel from '../../components/basicComponents/searchPannel/SearchPannel';
import Pagination from '@mui/material/Pagination';


class PatientList extends Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            patientList: [],
            patientListToView: [],
            loading: true,
            error: false,
            newItemLoading: false,
            patientEnded: false,
            doctorId: localStorage.getItem('id'),
            errorPurpose: 'unknown' ,
            itemsperPage: 5,
            currentPage: 1,
           
        }
    }

    componentDidMount() {
        this.onRequest();
        //setTimeout(()=>{this.slicePatient()},200)
    }

    
        handlePageClick = (e,pg) => {
        
        
        console.log(this.state.currentPage);
        const itemsperPage = this.state.itemsperPage;
        const start = (pg-1)*itemsperPage;
        const end = (pg*itemsperPage);
        console.log(start+ ' ' + end);
        const patients = this.state.patientList.slice(start,end);   
        this.setState({patientListToView: patients});
       
    }
    onRequest = () => {
        this.onPatientListLoading();
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.doctorId}/Patients`)
            //  .then(data=>console.log(data))
             .then(response => response.data.map(this.transformPatient))
             .then(res => this.onPatientListLoaded(res))
             .catch(this.onError);
        
    }
    slicePatient = (newPatientList)=>{
        const itemsperPage = this.state.itemsperPage;
        const patients = newPatientList.slice(0,itemsperPage); 
        console.log(patients);
        this.setState({patientListToView: patients});
    }

    onPatientListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    transformPatient = (patient) => {
        const birth = new Date(patient.dateOfBirth);
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
        console.log(newPatientList);
        this.slicePatient(newPatientList);
       
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
            console.log(item)
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
        if(
       (term.length !== 0)
        ){
            return this.state.patientList.filter(item => {
                return item.name.indexOf(term) > -1
            })
        }
    }
    

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    render(){ 
        const {loading, patientListToView,itemsperPage, patientList,error, term} = this.state;
        const visibleData = this.searchEmp(patientListToView, term);
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
                    <div className="container-header-item">Ім'я</div>
                    <div className="container-header-item">Вік</div>
                    <div className="container-header-item">Діагноз</div>
                </div>    
                <div className='search-element'>
                    <SearchPannel onUpdateSearch={this.onUpdateSearch}/>
                </div>                 
                <div className="container-content">
                    {errorComponent}
                    {spinnerComponent}
                    {content}
                </div>
                <Pagination onChange={this.handlePageClick}  count={Math.round(patientList.length/itemsperPage)} variant="outlined" />               
            </div>

        );
    }
}

export default PatientList