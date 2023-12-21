import {useParams, Link} from 'react-router-dom'
import './PatientPage.css'
// import PatientPageItem from '../../components/PatientPageItem/PatientPageItem';
import PatientCard from './../../components/PatientCard/PatientCard';

function PatientPage(){
    const { patientID } = useParams();
    return(
        <div className="patient-page">
            
            <PatientCard id={patientID}/>
            <Link to={`/patientList/${patientID}/records`}>
            <button className='appointment-button'>Щоденник записів</button>            </Link>
        </div>
    );
}

export default PatientPage