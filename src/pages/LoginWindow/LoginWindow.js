import './LoginWindow.css'

function LoginWindow(){


    return(
        <div className="login-container">
            <div className="login-header">
                <h2>Login</h2>
            </div>
            <div className="login-form">
                <form>
                    <div className="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default LoginWindow;