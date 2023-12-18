import './LoginWindow.css'
import { Component } from 'react';


class LoginWindow extends Component{
    componentDidMount(){
        document.querySelector('.NavBar').classList.add('display-none');
    }    

    render(){
        return(
            <div className="login-window">
                <div className="login-container">
                    <div className="login-header">
                        <h2>Login</h2>
                    </div>
                    <div className="login-form">
                        <form action="/mainpage" method=''>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" required autocomplete="off"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" required/>
                            </div>
                            <div className="form-group">
                                <button type="submit">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginWindow;