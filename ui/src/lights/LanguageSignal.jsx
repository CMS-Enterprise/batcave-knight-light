// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Local
import api from '../api/axiosConfig';

// 3rd Party
import {Card} from 'reactstrap';
import { useEffect } from 'react';

function LanguageSignal({ status, setStatus, language }){

    async function load() {
        await api.get("/")
            .then(res=> {
                setStatus(res.data);
            })
            .catch(err => {
                console.log("error in go endpoint"+ err.toString());
            });
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <Card className="bg-transparent">
            {!status && <img src={`public/backend-signals/${language}-off.svg`} alt={`${language} Service Offline Indicator`}/>}
            {status.status === "OFF" && <img src={`public/backend-signals/${language}-off.svg`} alt={`${language} Service Offline Indicator`}/>}
            {status.status === "ON" && <img src={`public/backend-signals/${language}-on.svg`} alt={`${language} Service Online Indicator`}/>}
            
        </Card>
    )
}

export default LanguageSignal;