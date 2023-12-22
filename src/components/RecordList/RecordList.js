import {Component} from 'react'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

import './RecordList.css';

import Spinner from './../basicComponents/spinner/Spinner';
import ErrorMessage from './../basicComponents/errorMessage/ErrorMessage';
import MedicalRecord from './../MedicalRecord/MedicalRecord';


class RecordList extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            itemsperPage: this.props.itemsperPage,
            records: [],
            newRecordsList:[],
            loading: true,
            error: false,
            newRecordLoading: false,
            filter: props.filter,
            currentPage:1,
            rerender: false
            

        }
    }

    componentDidMount() {
        setTimeout(()=>{this.onRequest()},1000)
    }

    static getDerivedStateFromProps(props, state) {
        return {rerender: props.rerender,filter: props.filter };
    }
    
    componentsDidUpdate() {

        console.log('update')
    }

    sliceRecord = (newRecordsList)=>{
        const itemsperPage = 8;
        const records = newRecordsList.slice(0,itemsperPage); 
        this.setState({newRecordsList: records});
    }

    onRequest = () => {
        this.onRecordsListLoading();
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.id}/Appointments`)
             .then(response => {
                return response;
             })
             .then(response => response.data.map(this.transformRecords))
             .then(array => array.filter(this.filterRecords))
             .then(res => this.onRecordsListLoaded(res))
             .catch(this.onError);
    }

    filterRecords = (item) => {
        if(this.state.filter === '' || this.state.filter === null){
            return true
        } else {
            return item.type === this.state.filter        
        }
    }
    componentDidUpdate(){
        if(this.state.rerender){
            this.setState({rerender:false});
        }
    }
    transformRecords = (record) => {
        const date = (item) => {
            const dateArr = item.split("-")
            return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
        }
        return {
            id: record.appointmentID,
            diagnosis: record.diagnosis,
            date: date(record.appointmentDate),
            doctor: record.doctor,
            description: record.description,
            treatment: record.treatment,
            type: record.type
        }
    }

    onRecordsListLoading = () => {
        this.setState({
            newRecordLoading: true
        })
    }
    handlePageClick = (e,pg) => {
        
        
        console.log(pg);
        const itemsperPage = 8;
        const start = (pg-1)*itemsperPage;
        const end = (pg*itemsperPage);
        console.log(start+ ' ' + end);
        const recordsPerPage = this.state.records.slice(start,end);
        console.log(recordsPerPage)   
        this.setState({newRecordsList: recordsPerPage});
    }
    onRecordsListLoaded = (newRecordsList) => {
        const newarr = newRecordsList.reverse();
        this.setState(({records})=>({
            records: [...records, ...newarr],
            loading: false,
            newRecordLoading: false
        }))
        console.log(newRecordsList);
        this.sliceRecord(newarr);
    }

    onError = (errorBody) => {
        this.setState({
            error: true,
            loading: false,
            errorPurpose: errorBody.message
        })
    }

    adjustItems = (arr)=> {
        const items = arr.map((item)=>{
            return (
                    <MedicalRecord key={item.id}
                        id={item.id} 
                        doctor={item.doctor} 
                        diagnosis={item.diagnosis}
                        date={item.date}
                        description={item.description}
                        treatment={item.treatment}
                        type={item.type}
                    >
                    </MedicalRecord>
            )
        })
        return(
            <ul className="record-list">
                {items}    
            </ul> 
        ) 
    }

     rerender(){
      
        
        
    }
    render(){ 
        this.rerender();
        const {loading, newRecordsList, error} = this.state;
        const adjustedList = this.adjustItems(newRecordsList);
        //const b = this.state.rerender;
        
        const spinnerComponent = loading ? <Spinner/> : null;
        const errorComponent = 
            error ? 
            <ErrorMessage 
                errorMessage={'Records cannot be displayed'} 
                errorPurpose={this.state.errorPurpose}/> 
            : null;

        const content = !(loading||error) ? adjustedList : null;
        
        return(
            <div className='record-list'>
                {errorComponent}
                {spinnerComponent}
                {content}   
                <Pagination onChange={this.handlePageClick}   count={Math.round(this.state.records.length/8)} variant="outlined" />               
             
            </div>

        );
    }
}

export default RecordList