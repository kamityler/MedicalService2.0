import './LoginWindow.css'
import { Component } from 'react';


class LoginWindow extends Component{
    componentDidMount(){
        document.querySelector('.NavBar').classList.add('display-none');
    }    
    handleClick=(e)=>{
        //e.preventDefault();
        let email = document.querySelector('#username').value;
        let id = null
        if(email === '123@gmail.com'){
            id = 1;
        }
        else{
            id=2;
        }
        // Зберігаємо значення в localStorage з ключем "id" і значенням 1
        localStorage.setItem('id', id);
        console.log(localStorage.getItem('id'));
      };
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
                                <button onClick={this.handleClick} >Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginWindow;