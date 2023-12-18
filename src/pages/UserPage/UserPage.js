import {Component} from 'react'

import './UserPage.css';

class UserPage extends Component{

    render(){
        return(
            <div className="account-settings">
                <div className="profile-container">
                    <div className="profile-header">
                        <h2>Profile Settings</h2>
                    </div>
                    <div className="profile-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="fullName">Your name: dr.Bodnar</label>
                                <label htmlFor="fullName">Change your name:</label>
                                <input type="text" id="fullName" name="fullName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your email: danylo.bodnar.pz.2020@lpnu.ua</label>
                                <label htmlFor="email">Change your email:</label>
                                <input type="email" id="email" name="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password:</label>
                                <input type="password" id="password" name="password"/>
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