import {Component} from 'react'
import axios from 'axios';
import MedicalRecord from '../../components/MedicalRecord/MedicalRecord';
import './UserPage.css';
import Pagination from '@mui/material/Pagination';

class UserPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: {
                id: localStorage.getItem('id'),
                firstName: 'name',
                lastName: 'surname',
                birthDate: 'dateOfBirth',
                specialty: 'none',
                address: 'address',
                email: 'email',
                phoneNumber: 'phone',
                // description: 'description'
            },
            records:[],
            loading: true,
            error: false,
            errorPurpose: 'unknown',
            loadingApp: true,
            newRecordLoading: false
        }
    }

    componentDidMount() {
        this.onRequest();
        setTimeout(()=> document.querySelector('.editButton').style.width = document.querySelector('.doctor-card').getBoundingClientRect().width + 'px');

        window.addEventListener('resize', this.handleResize);
        //this.onRequest();
    }
    handleResize=()=>{
        setTimeout(()=> document.querySelector('.editButton').style.width = document.querySelector('.doctor-card').getBoundingClientRect().width + 'px');

    }
        onRequest = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/Doctor/${this.state.user.id}`)
            //.then(response=>console.log(response.data))
             .then(response => this.transformPatient(response.data))
             .then(result => this.onPatientInfoLoaded(result))
             .then(this.onAppointmentRequest)
             .catch(this.onError);
    }
    onAppointmentRequest = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/Doctor/Appointments/${this.state.user.id}`)
            //.then(response=>console.log(response.data))
            .then(response => response.data.map(this.transformRecords))
            .then(res => this.onRecordsListLoaded(res))
            .catch(this.onError);
   }

   transformRecords = (record) => {
       const date = (item) => {
           const dateArr = item.split("-")
           return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
       }
       console.log(record.medicalRecord)
       return {
           id: record.appointmentID,
           diagnosis: record.diagnosis,
           date: date(record.appointmentDate),
           doctor: record.doctor,
           description: record.description,
           treatment: record.treatment,
           medicalRecord: record.medicalRecord
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
   }
   adjustItems(arr) {
    const items = arr.map((item)=>{
        return (
                <MedicalRecord key={item.id}
                    id={item.id} 
                    patient={item.medicalRecord.lastName} 
                    diagnosis={item.diagnosis}
                    date={item.date}
                    description={item.description}
                    treatment={item.treatment}
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

    transformPatient = (response) => {
        const date = (item) => {
            const dateArr = item.split("-")
            return dateArr[2][0] + dateArr[2][1] +'.'+ dateArr[1] +'.'+ dateArr[0]
        }
        
        return({
            firstName: response.lastName,
            lastName: response.firstName,
            birthDate: date(response.birthDate),
            specialty: response.specialty,
            address: response.address,
            email: response.email,
            phoneNumber: response.phoneNumber,
            medicalRecord: response.medicalRecord
        })
    }
    onPatientInfoLoaded = (info) => {
        this.setState(()=>({
            user: info,
            loading: false
        }))
    }
     openModal= () =>{
        console.log('swd');
        document.querySelector(".modal").style.display = "block";

      }
      closeModal = (e)=>{
        e.preventDefault();
        var user = this.state.user;
        var email = this.emptyCheck(document.querySelector("#email").value);
        var phoneNumber  = this.emptyCheck(document.querySelector("#tel").value);
        var address = this.emptyCheck(document.querySelector('#adress').value);
        

         user.email = (email.responce) ? email.value: user.email
         user.phoneNumber = (phoneNumber.responce) ? phoneNumber.value: user.phoneNumber
         user.address = (address.responce) ? address.value: user.address
         this.setState({user:user});

         setTimeout(()=>{         document.querySelector('.editButton').style.width = document.querySelector('.doctor-card').getBoundingClientRect().width + 'px';
    },1)


        document.querySelector(".modal").style.display = "none";

      }
      emptyCheck=(value)=>{
        
        if(value.length!==0){
            return{responce:true,value:value}
        }
        return{responce:false}
      }
    render(){
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";
        const {records} = this.state;
        const adjustedList = this.adjustItems(records);
        return(
            <div className="account-settings">
                <div className="settings-spacer">

                </div>
                <div>
                <div className="doctor-card">
                    <ul className="doctor-info-ul">
                            <img className="doctor-avatar" src={url} alt="doctor" />
                            <li className="doctor-info-li">Name: <span className="exact-information-item">{this.state.user.firstName}</span></li>
                            <li className="doctor-info-li">Surname: <span className="exact-information-item">{this.state.user.lastName}</span></li>
                            <li className="doctor-info-li">Occupation: <span className="exact-information-item">{this.state.user.specialty}</span></li>
                            <li className="doctor-info-li">Gender: <span className="exact-information-item">Male</span></li>
                            <li className="doctor-info-li">Date of brith: <span className="exact-information-item">{this.state.user.birthDate}</span></li>
                            <li className="doctor-info-li">Address: <span className="exact-information-item">{this.state.user.address}</span></li>
                            <li className="doctor-info-li">Email: <span className="exact-information-item">{this.state.user.email}</span></li>
                            <li className="doctor-info-li">Phone: <span className="exact-information-item">{this.state.user.phoneNumber}</span></li>
                            
                        </ul>
                        </div>
                        <button className="editButton" onClick={this.openModal}type="button" >Edit profile</button>

                </div>
                
                <div className='appointment-block'>
                    <h1>Історія записів</h1>
                    <div className='appointmentContainer'>
                        {adjustedList}
                        
                        <Pagination   count={10} variant="outlined" />
                    </div>
                        
        
                    
                           
                </div>
                <div class="card">
                <ul class="list-group list-group-flush">
  <div class="card-header">
    Історія записів
  </div>
  
    <li class="list-group-item">Календар</li>
    <li class="list-group-item">Результати опитувань</li>
    <li class="list-group-item">Безпека</li>
  </ul>
</div>
                <div id="MyModal" className=" modal">
                    <div className='modal-content profile-container'>
                    <div className="profile-header">
                        <h2>Profile Settings</h2>
                    </div>
                    <div className="profile-form "  >
                        <form>
            
                            <div className="form-group">
                                <label htmlFor="adress">Change your adress:</label>
                                <input type="text" id="adress" name="adress"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Change your email:</label>
                                <input type="email" id="email" name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tel">Change your phone number:</label>
                                <input type="text" id="tel" name="tel" />
                            </div>
                          
                            <div className="form-group">
                                <button type="submit" onClick={this.closeModal} >Save Changes</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default UserPage