import './LoginWindow.css'

import React from 'react';

function LoginWindow() {
    const handleLoginClick = () => {
        // Знаходження об'єкта з класом .navbar
        const navbarElement = document.querySelector('.NavBar');
        console.log(navbarElement)
        // Втратити клас .display, якщо об'єкт знайдено
        if (navbarElement) {
            navbarElement.classList.remove('display');
        }

        // Тут можна також викликати інші дії або переадресацію на /mainpage
    };

    return (
        <div className="login-window">
            <div className="login-container">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                <div className="login-form">
                    <form action="/mainpage">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <div className="form-group">
                            {/* Додавання обробника події onClick */}
                            <button href="/mainpage" type="button" onClick={handleLoginClick}>
                                <a href="/mainpage">Login</a>
                                
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ); <a >Main Page</a>
}

export default LoginWindow;