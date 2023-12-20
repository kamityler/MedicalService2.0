
import React from 'react';
import { Component } from 'react';
import './LoginWindow.css'
class LoginWindow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            loading: true,
            error: false,
            errorPurpose: 'unknown'
        }
    }
    componentDidMount() {
        let er = document.createElement('span');
        er.textContent = "Користувача не знайдено";
        er.style.color = 'red'
        this.setState({
            errorMessage: er
        })
        document.querySelector('.NavBar').classList.add('display-none');
    }
    handleClick = (e) => {
        e.preventDefault();
        let email = document.querySelector('#username');
        let id = null
        let form = document.querySelector('form')

        if (email.value === 'emily.jones@example.com') {
            id = 1;
            form.submit();
        } else if (email.value === 'oleg.olegovich@example.com') {
            id = 2;
            form.submit();
        } else {
            if (!email.parentNode.isSameNode(this.state.errorMessage.parentNode)) {
                email.parentElement.appendChild(this.state.errorMessage);
            }
        }
        localStorage.setItem('id', id);
        console.log(localStorage.getItem('id'));
    };
    render(){
        return(
            <div className="login-window">
                <div className="login-container">
                    <div className="login-header">
                        <h2>Вхід на сторінку</h2>
                    </div>
                    <div className="login-form">
                        <form action="/mainpage" method=''>
                            <div className="form-group">
                                <label htmlFor="username">Ім'я користувача:</label>
                                <input type="text" id="username" name="username" placeholder="Введіть ім'я" required autocomplete="off"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль:</label>
                                <input type="password" id="password" name="password" placeholder="Введіть пароль" required/>
                            </div>
                            <div className="form-group">
                                <button onClick={this.handleClick}>Ввійти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginWindow;