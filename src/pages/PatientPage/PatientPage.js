import {useParams, Link} from 'react-router-dom'

// import PatientPageItem from '../../components/PatientPageItem/PatientPageItem';
import PatientCard from './../../components/PatientCard/PatientCard';

function PatientPage(){
    const { patientID } = useParams();
    return(
        <div className="patient-page">
            <Link to={`/patientList/${patientID}/records`}>
                <button>перейти до записів</button>
            </Link>
            <PatientCard id={patientID}/>
            <Link to={`/patientList/${patientID}/records`}>
                <button>перейти до записів</button>
            </Link>
        </div>
    );
}

export default PatientPage