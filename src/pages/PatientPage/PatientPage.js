import {useParams, Link} from 'react-router-dom'

// import PatientPageItem from '../../components/PatientPageItem/PatientPageItem';
import PatientCard from './../../components/PatientCard/PatientCard';

function PatientPage(){
    const { patientID } = useParams();
    return(
        <div className="patient-page">
            <PatientCard patientID={patientID}/>
            <Link to={`/patientList/${patientID}/records`}>
                <button>records</button>
            </Link>
        </div>
    );
}

export default PatientPage