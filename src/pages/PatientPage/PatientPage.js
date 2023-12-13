import {useParams} from 'react-router-dom'

import PatientPageItem from '../../components/PatientPageItem/PatientPageItem';

function PatientPage(){
    const { patientID } = useParams();
    return(
        <PatientPageItem patientID={patientID}/>
    );
}

export default PatientPage