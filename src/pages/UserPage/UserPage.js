import {Component} from 'react'

import './UserPage.css';

class UserPage extends Component{

    render(){
        const url = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png";
        return(
            <div className="account-settings">
                <div className="settings-spacer">

                </div>
                <div className="doctor-card">
                    <ul className="doctor-info-ul">
                            <img className="doctor-avatar" src={url} alt="doctor" />
                            <li className="doctor-info-li">Name: <span className="exact-information-item">dr.Bodnar</span></li>
                            <li className="doctor-info-li">Gender: <span className="exact-information-item">Male</span></li>
                            <li className="doctor-info-li">Date of brith: <span className="exact-information-item">30.05.2003</span></li>
                            <li className="doctor-info-li">Address: <span className="exact-information-item">Lviv, Ukraine</span></li>
                            <li className="doctor-info-li">Email: <span className="exact-information-item">bodnar.dp@gmail.com</span></li>
                            <li className="doctor-info-li">Phone: <span className="exact-information-item">+380731231234</span></li>
                        </ul>
                </div>
                <div className="profile-container">
                    <div className="profile-header">
                        <h2>Profile Settings</h2>
                    </div>
                    <div className="profile-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="fullName">Change your name:</label>
                                <input type="text" id="fullName" name="fullName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="adress">Change your adress:</label>
                                <input type="text" id="adress" name="adress"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Change your email:</label>
                                <input type="email" id="email" name="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tel">Change your phone number:</label>
                                <input type="text" id="tel" name="tel" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password:</label>
                                <input type="password" id="password" name="password" autoComplete="on"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={(e)=>{e.preventDefault()}}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default UserPage