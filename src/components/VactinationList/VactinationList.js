import {Component} from 'react'
import axios from 'axios';
import Vactination from '../Vactination/Vactination';
import ModalWindow from '../modalWindow/ModalWindow';

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
             .catch(this.onError);
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
           <button onClick={this.onAddVactinationClick}className="endDiseaseButton">Додати інформацію про щеплення</button>
           <ModalWindow show={this.state.show} handleClose={this.hideModal}>
                    <form className="modal-form" onSubmit={this.onDiseaseAdd}>
                            <h1 className="modal-header">Інформація про щеплення</h1>
                            <p className="modal-label">Назва вакцини:</p>
                            <input type="text" name="name" className="Name" placeholder='Назва вакцини' required></input>
                            <p className="modal-label">Опис:</p>
                            <input type="text" name="name" className="Name" placeholder='Опис' required></input>
                            <button className="form-button-submit" value="Submit" type="submit" >Додати діагноз</button>
                        </form>
            </ModalWindow>
        </div>
        )
    }
}
export default VactinationList