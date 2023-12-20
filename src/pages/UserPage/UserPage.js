import {Component} from 'react'
import axios from 'axios';

import './UserPage.css';

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
            loading: true,
            error: false,
            errorPurpose: 'unknown'
        }
    }

    componentDidMount() {
        this.onRequest();
    }
    onRequest = () => {
        axios.get(`https://localhost:5001/api/MedicalRecords/Doctor/${this.state.user.id}`)
            //.then(response=>console.log(response.data))
             .then(response => this.transformPatient(response.data))
             .then(result => this.onPatientInfoLoaded(result))
             .catch(this.onError);
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
            phoneNumber: response.phoneNumber
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