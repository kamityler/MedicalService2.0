import {Component} from 'react'
import axios from 'axios';

import './RecordList.css';

import Spinner from '../spinner/Spinner';
import ErrorMessage from './../errorMessage/ErrorMessage';
import MedicalRecord from './../MedicalRecord/MedicalRecord';


class RecordList extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            records: [],
            loading: true,
            error: false,
            newRecordLoading: false,
        }
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        this.onRecordsListLoading();
        axios.get(`https://localhost:5001/api/MedicalRecords/${this.state.id}/Appointments`)
            //  .then(res => console.log(res.data))
             .then(response => response.data.map(this.transformRecords))
            //  .then(result => console.log(result))
             .then(res => this.onRecordsListLoaded(res))
             .catch(this.onError);

    }

    transformRecords = (record) => {
        const date = (item) => {
            console.log(item)
            const dateArr = item.split("-")
            return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
        }

        return {
            id: record.appointmentID,
            diagnosis: record.diagnosis,
            date: date(record.appointmentDate),
            doctor: record.doctor,
            description: record.description,
            treatment: record.treatment
        }
    }

    onRecordsListLoading = () => {
        this.setState({
            newRecordLoading: true
        })
    }

    onRecordsListLoaded = (newRecordsList) => {
        this.setState(({records})=>({
            records: [...records, ...newRecordsList],
            loading: false,
            newRecordLoading: false
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
                    <MedicalRecord key={item.id}
                        id={item.id} 
                        doctor={item.doctor} 
                        diagnosis={item.diagnosis}
                        date={item.date}
                        description={item.description}
                        treatment={item.treatment}
                    >
                    </MedicalRecord>
            )
        })

        return(
            <ul className='record-list'>
                {items}
            </ul>
        ) 
    }

    render(){ 
        const {loading, records, error} = this.state;
        const adjustedList = this.adjustItems(records);

        const spinnerComponent = loading ? <Spinner/> : null;
        const errorComponent = 
            error ? 
            <ErrorMessage 
                errorMessage={'List cannot be displayed'} 
                errorPurpose={this.state.errorPurpose}/> 
            : null;

        const content = !(loading||error) ? adjustedList : null;
        
        return(
            <div className="container-record-list">
                <div className="container-content">
                    {errorComponent}
                    {spinnerComponent}
                    {content}
                </div>
            </div>
        );
    }
}

export default RecordList