import img from './Error.gif'

import './ErrorMessage.css'

const ErrorMessage = (props) => {
    return (
        <div className="error-container">
            <img className="error-message-img" src = {img} alt='error_image'/>
            <h1 className="error-message-text upper"> {props.errorMessage?props.errorMessage:'Something went wrong'}</h1>
            <h1 className="error-message-text lower">{props.errorPurpose} </h1>
        </div>
    )
}

export default ErrorMessage;