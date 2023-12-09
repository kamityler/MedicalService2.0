import {BrowserRouter as useParams} from 'react-router-dom'


import PatientCard from '../../components/PatientCard/PatientCard';
import RecordList from '../../components/RecordList/RecordList';

import './PatientPage.css';

function PatientPage(){
    let { patientID } = useParams();

    console.log(patientID);

    return(
        <div className="medical-card-page">
            <PatientCard id={1}
                            name={'John'}
                            surname={'Doe'}
                            dateOfBirth={'1978-02-03'}
                            adress={'Ukraine, Kyiv, Kavunova 10/15'}
                            email={'johndoe1978@mail.com'}
                            phone={'+380 (63) 420 1312'}
            >
            </PatientCard>
            <RecordList></RecordList>
        </div>
    );
}

export default PatientPage